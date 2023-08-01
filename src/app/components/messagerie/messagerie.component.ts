
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message, UtilisateurDtoMessage } from 'src/app/models/Message';
import { HeightService } from 'src/app/services/height.service';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { DialogMessagerieComponent } from './dialogs/dialog-messagerie/dialog-messagerie.component';
import { ConversationComponent } from './conversation/conversation.component';
import { Subject, asyncScheduler, filter, scheduled, takeUntil, timer, toArray } from 'rxjs';
import { DialogAjoutConversationComponent } from './dialogs/dialog-ajout-conversation/dialog-ajout-conversation.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DetailsConversationComponent } from './details-conversation/details-conversation.component';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent {

  private ngUnsubscribe = new Subject<void>();
  private CopieLastMessageForAnyConversations!: Message[];
  private selectedConversation!: Message[];

  userId!: number | null;
  lastMessageForAnyConversations!: Message[];
  conversation!: Message[];
  isSearchConversation: boolean = false;

  @ViewChildren('appconversation') appConversations!: QueryList<ConversationComponent>;
  @ViewChild('divHeaderConversations') elementHeaderConversations!: ElementRef;
  @ViewChild('appDetailsConversation') appDetailsConversation!: any;
  @ViewChild('divHeaderDetailsConversation') elementHeaderDetailsConversation!: ElementRef;
  @ViewChild('divFooterDetailsConversation') elementFooterDetailsConversation!: ElementRef;
  @ViewChild('elementTextAreaMessage') elementTextAreaMessage!: ElementRef;
  footerHeight!: number;
  headerHeight!: number;
  headerConversationsHeight!: number;
  headerAndFooterHeightOfDetailsConversation!: number;

  valueMessageTextAreaToSend: string = '';
  valueSearchConversation: string = '';

  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.handleWindowResize();
  }
  handleWindowResize() {
    this.headerConversationsHeight = this.elementHeaderConversations.nativeElement.offsetHeight;
    this.headerAndFooterHeightOfDetailsConversation = this.elementHeaderDetailsConversation.nativeElement.offsetHeight + this.elementFooterDetailsConversation.nativeElement.offsetHeight;
  }

  handleTextAreaResize() {
    const textarea = this.elementTextAreaMessage.nativeElement;
    if (textarea.offsetHeight < ((this.appDetailsConversation as DetailsConversationComponent).elementDivMessages.nativeElement.offsetHeight)) {
      textarea.style.height = 'min-content';
      textarea.style.height = `${textarea.scrollHeight}px`;
      this.headerAndFooterHeightOfDetailsConversation = this.elementHeaderDetailsConversation.nativeElement.offsetHeight + this.elementFooterDetailsConversation.nativeElement.offsetHeight;
    }
  }

  constructor(
    private messagerieService: MessagerieService,
    private utilisateurService: UtilisateurService,
    private heightService: HeightService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.userId = this.utilisateurService.userSession.userId;

    this.heightService.headerHeight$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({

      next: response => this.headerHeight = response,
      error: _error => this.dialog.open(DialogMessagerieComponent, { data: "erreur lors du chargement, veuillez actualiser la page" })
    });

    this.heightService.footerHeight$.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: response => this.footerHeight = response,
      error: _error => this.dialog.open(DialogMessagerieComponent, { data: "erreur lors du chargement, veuillez actualiser la page" })
    });
  }

  ngAfterViewInit() {

    this.headerConversationsHeight = this.elementHeaderConversations.nativeElement.offsetHeight;

    this.headerAndFooterHeightOfDetailsConversation = this.elementHeaderDetailsConversation.nativeElement.offsetHeight + this.elementFooterDetailsConversation.nativeElement.offsetHeight;

    this.getlastMessageOfAllConversations();
  }

  getlastMessageOfAllConversations() {
    if (this.userId !== null)
      this.messagerieService.getlastMessageOfAllConversations(this.userId)
        .then(conversations => {
          if (conversations.length !== 0) {
            this.lastMessageForAnyConversations = conversations;
            this.CopieLastMessageForAnyConversations = this.lastMessageForAnyConversations;

            this.messagerieService.getDetailsConversationBetween2User(conversations[0].expediteur_id, conversations[0].destination_id)
              .then(conversation => {
                this.conversation = conversation;
                this.selectedConversation = conversation;
              })
              .catch(_error => this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite, veuillez réessaiyer plus tard." })
              );
          } else {
            this.dialog.open(DialogMessagerieComponent, { data: "Vous n'avez pas de messages." })
          }
        })
        .catch(_error => {
          this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite, veuillez réessaiyer plus tard." })
        });
  }

  onClickCreateConversation() {
    const refDialog = this.dialog.open(DialogAjoutConversationComponent, {
      data: { id: '', nomDestination: '', contenu: '' }
    });

    refDialog.afterClosed().subscribe((utilisateurDtoMessage: UtilisateurDtoMessage) => {
      if (utilisateurDtoMessage && this.userId !== null) {
        let message = new Message(+utilisateurDtoMessage.id, this.userId);
        message.nomDestination = utilisateurDtoMessage.nomDestination;
        message.contenu = utilisateurDtoMessage.contenu;
        this.saveMessage(message);
      }
    })
  }

  // isConversationExise(conversation: Message): boolean {
  //   let returnValue: boolean = false;
  //   this.lastMessageForAnyConversations.forEach(conversationExisting => {
  //     if (conversation.destination_id === conversationExisting.destination_id || conversation.destination_id === conversationExisting.expediteur_id) {
  //       returnValue = true;
  //     }
  //   })
  //   return returnValue;
  // }

  getElementConversationContentMessage(message: Message): HTMLDivElement | null {
    for (const appConversation of this.appConversations) {
      if ((message.destination_id === appConversation.conversation.destination_id && message.expediteur_id === appConversation.conversation.expediteur_id) ||
        (message.destination_id === appConversation.conversation.expediteur_id && message.expediteur_id === appConversation.conversation.destination_id)
      ) {
        if (appConversation.elementDivConversation)
          return appConversation.elementDivConversation.nativeElement as HTMLDivElement;
      }
    }
    return null;
  }

  viewConversation(lastMessageOfconversation: Message) {
    if (this.isSearchConversation) {
      this.lastMessageForAnyConversations = this.CopieLastMessageForAnyConversations;
      this.isSearchConversation = false;
      this.valueSearchConversation = ''
    }
    if (this.userId !== null)
      this.messagerieService.getDetailsConversationBetween2User(lastMessageOfconversation.expediteur_id, lastMessageOfconversation.destination_id)
        .then(conversation => {
          this.conversation = conversation;
          this.selectedConversation = conversation;
          let elementDivConversation = this.getElementConversationContentMessage(lastMessageOfconversation);
          if (elementDivConversation !== null)
            if (elementDivConversation.parentElement !== null)
              this.messagerieService.setSelectedConversationSubject(elementDivConversation.parentElement.id);

        })
        .catch(_ => this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite, veuillez réessaiyer plus tard." }));
  }

  displayConversationIfExistAfterDelete(paramsSuppresionConversation: { [key: string]: string | Message } | null) {

    if (paramsSuppresionConversation !== null) {
      let attributeIdOfFirstConversationToDisplay = paramsSuppresionConversation['attributeIdOfFirstConversationToDisplay'] as string;
      let conversationToDelete = paramsSuppresionConversation["conversationToDelete"] as Message;
      console.log(attributeIdOfFirstConversationToDisplay, conversationToDelete);

      let conversationToSee!: Message;
      for (const appConversation of this.appConversations) {
        if (appConversation.elementDivConversation.nativeElement.parentElement.id === attributeIdOfFirstConversationToDisplay) {
          conversationToSee = appConversation.conversation;
          break;
        }
      }

      // supprimer la conversation de la liste et faire une copie
      this.lastMessageForAnyConversations = this.lastMessageForAnyConversations.filter(
        (message: Message) => {
          if (message.id === conversationToDelete.id)
            return false;
          return true;
        }
      )
      this.CopieLastMessageForAnyConversations = this.lastMessageForAnyConversations;
      this.viewConversation(conversationToSee);
    } else {
      this.conversation = [];
      this.selectedConversation = [];
    }
  }

  searchConversation() {
    let listConversation = this.CopieLastMessageForAnyConversations;

    if (this.valueSearchConversation) {

      this.isSearchConversation = true;
      scheduled(listConversation, asyncScheduler).pipe(
        filter(conversation => {
          if (conversation.expediteur_id !== this.userId) {
            return this.removeAccents(conversation.nomExpediteur.toLowerCase()).includes(this.valueSearchConversation.toLowerCase())
          }
          return this.removeAccents(conversation.nomDestination.toLowerCase()).includes(this.valueSearchConversation.toLowerCase());
        }),
        toArray()
      ).subscribe(value => this.lastMessageForAnyConversations = value)
    } else {
      this.lastMessageForAnyConversations = this.CopieLastMessageForAnyConversations;
      // this.viewConversation(this.selectedConversation[0]);
    }
  }

  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  sendMessage(keyEnter?: Event) {
    if (keyEnter) {
      keyEnter.preventDefault();
    }
    if (this.valueMessageTextAreaToSend !== '') {
      let body = this.valueMessageTextAreaToSend;
      if (this.selectedConversation) {

        let message!: Message;
        let lastMessage = this.selectedConversation[this.selectedConversation.length - 1];
        if (lastMessage.expediteur_id === this.userId) {
          message = new Message(lastMessage.destination_id, lastMessage.expediteur_id);
        } else {
          message = new Message(lastMessage.expediteur_id, lastMessage.destination_id);
        }
        message.contenu = body;

        this.saveMessage(message).then(isSuccess => {
          if (isSuccess) {
            this.valueMessageTextAreaToSend = '';
            this.elementTextAreaMessage.nativeElement.style.height = 'min-content';
            this.handleWindowResize();
          }
          else this.valueMessageTextAreaToSend = body;
        });
      }
    }
  }

  async saveMessage(message: Message): Promise<boolean> {
    return this.messagerieService.sendMessage(message)
      .then(response => {
        if (response.status == 200 && response.body !== null) {
          this.getlastMessageOfAllConversations();
          return true;
        }
        return false;
      })
      .catch(erreur => {
        if (erreur.status == 404)
          this.dialog.open(DialogMessagerieComponent, { data: "l'utilisateur que vous essayez de joindre n'éxiste pas !" });
        else
          this.dialog.open(DialogMessagerieComponent, { data: "le message n'a pas était envoyé, veuillez réessayer plus tard !" });
        return false;
      });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

