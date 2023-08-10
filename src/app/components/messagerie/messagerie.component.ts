
import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message, UtilisateurDestinataireMessage } from 'src/app/models/message';
import { HeightService } from 'src/app/services/height.service';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { DialogMessagerieComponent } from './dialogs/dialog-messagerie/dialog-messagerie.component';
import { ConversationComponent } from './conversation/conversation.component';
import { Subject, asyncScheduler, filter, scheduled, takeUntil, toArray } from 'rxjs';
import { DialogAjoutConversationComponent } from './dialogs/dialog-ajout-conversation/dialog-ajout-conversation.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DetailsConversationComponent } from './details-conversation/details-conversation.component';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent {

  constructor(
    private messagerieService: MessagerieService,
    private utilisateurService: UtilisateurService,
    private heightService: HeightService,
    public dialog: MatDialog,
  ) { }

  private ngUnsubscribe = new Subject<void>();

  userId!: number | null;
  allConversations!: Message[];
  copieAllConversations!: Message[]; // à chaque changement de la liste des conversations, la sauvegarder ici. elle sera utilisable au moment de la recherche dasn les conversations
  allMessageOfConversation!: Message[];

  @ViewChildren('appconversation') appConversations!: QueryList<ConversationComponent>;
  @ViewChild('appDetailsConversation') appDetailsConversation!: DetailsConversationComponent;

  @ViewChild('divHeaderConversations') elementHeaderConversations!: ElementRef;
  @ViewChild('divHeaderDetailsConversation') elementHeaderDetailsConversation!: ElementRef;
  @ViewChild('divFooterDetailsConversation') elementFooterDetailsConversation!: ElementRef;
  footerHeight!: number;
  headerHeight!: number;
  headerConversationsHeight!: number;
  headerAndFooterHeightOfDetailsConversation!: number;

  @ViewChild('elementTextAreaMessage') elementTextAreaMessage!: ElementRef;
  valueMessageTextAreaToSend: string = '';

  @HostListener('window:resize', ['$event']) onWindowResize() {
    this.handleWindowResize();
  }

  /**
   * Surveille le changement de taille du footer et header de la conversation et du details-conversation qui se trouve dans messagerie.html
   */
  handleWindowResize() {
    this.headerConversationsHeight = this.elementHeaderConversations.nativeElement.offsetHeight;
    this.headerAndFooterHeightOfDetailsConversation = this.elementHeaderDetailsConversation.nativeElement.offsetHeight + this.elementFooterDetailsConversation.nativeElement.offsetHeight;
  }

  /**
   * permet de géger le changement de la taille du textArea en fonction du nombre de saut de ligne et ajouste le corp div des détails-conversation en conséquence
   */
  handleTextAreaResize() {
    const textarea = this.elementTextAreaMessage.nativeElement as HTMLAreaElement;
    if (this.appDetailsConversation)
      if (textarea.offsetHeight < this.appDetailsConversation.elementDivMessages.nativeElement.offsetHeight) {
        textarea.style.height = 'min-content';
        textarea.style.height = `${textarea.scrollHeight}px`;
        this.headerAndFooterHeightOfDetailsConversation = this.elementHeaderDetailsConversation.nativeElement.offsetHeight + this.elementFooterDetailsConversation.nativeElement.offsetHeight;
      }
  }

  ngOnInit() {
    this.userId = this.utilisateurService.userSession.userId;

    ///* souscrire à deux observables pour surveuiller le changement de taille du footer et du header principale *///
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

  /**
   * Permet de récupérer l'enssemble des conversation d'un utilisateur et de charger la première conversation de la liste.
   * Active la zone textArea pour saisir un message s'il y a des conversation sinon la zone textArea est désactive
   */
  getlastMessageOfAllConversations() {

    if (this.userId !== null)
      this.messagerieService.getlastMessageOfAllConversations(this.userId)
        .then(conversations => {
          if (conversations.length !== 0) {
            (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).removeAttribute("disabled");
            (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).nextElementSibling?.removeAttribute("disabled");

            this.allConversations = conversations;
            this.copieAllConversations = this.allConversations;

            this.messagerieService.getDetailsConversationBetween2User(conversations[0].expediteur_id, conversations[0].destination_id)
              .then(messagesConversation => {
                this.allMessageOfConversation = messagesConversation;
              })
              .catch(_ =>
                this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite, veuillez réessaiyer plus tard." })
              )
          } else {
            (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).setAttribute("disabled", '');
            (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).nextElementSibling?.setAttribute("disabled", '');

            this.dialog.open(DialogMessagerieComponent, { data: "Vous n'avez pas de messages." })
          }
        })
        .catch(_ => {
          (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).setAttribute("disabled", '');
          (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).nextElementSibling?.setAttribute("disabled", '');

          this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite, veuillez réessaiyer plus tard." })
        });
    else
      (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).setAttribute("disabled", '');
    (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).nextElementSibling?.setAttribute("disabled", '');

  }

  /**
   * Ouvre une boite de dialogue afin de chercher un utilisateur et lui envoyer un message.
   * cela va créer la conversation en mettant à jour la variable "allConversations"
   */
  onClickCreateConversation() {
    const refDialog = this.dialog.open(DialogAjoutConversationComponent, {
      data: { id: '', nomDestination: '', contenu: '' }, width: "40vw", maxWidth: "600PX", minWidth: '200px'
    });

    refDialog.afterClosed().subscribe((utilisateurDestinataireMessage: UtilisateurDestinataireMessage) => {

      if (utilisateurDestinataireMessage && this.userId !== null) {
        let message = new Message(+utilisateurDestinataireMessage.id, this.userId);
        message.nomDestination = utilisateurDestinataireMessage.nomDestination;
        message.contenu = utilisateurDestinataireMessage.contenu;
        this.saveMessage(message);
      }
    })
  }

  // isConversationExise(conversation: Message): boolean {
  //   let returnValue: boolean = false;
  //   this.allConversations.forEach(conversationExisting => {
  //     if (conversation.destination_id === conversationExisting.destination_id || conversation.destination_id === conversationExisting.expediteur_id) {
  //       returnValue = true;
  //     }
  //   })
  //   return returnValue;
  // }

  /**
   * analyse les instances "appConversation" créée avec le ngFor dans la template,
   * afin de trouver celle qui contient un message passer en param
   * @param message
   * @returns HTMLDivElement
   */
  getElementConversationContentMessage(message: Message): HTMLDivElement {
    let elementDiv!: HTMLDivElement;
    for (const appConversation of this.appConversations) {
      if ((message.destination_id === appConversation.conversation.destination_id && message.expediteur_id === appConversation.conversation.expediteur_id) ||
        (message.destination_id === appConversation.conversation.expediteur_id && message.expediteur_id === appConversation.conversation.destination_id)
      ) {
        elementDiv = appConversation.elementDivConversation.nativeElement as HTMLDivElement;
      }
    }
    return elementDiv;
  }

  /**
   * analyse les instances "appConversation" créée avec le ngFor dans la template,
   * afin de trouver celle qui contient l'attribute class "selectedConversation"
   * @returns conversation : Message
   */
  getSelectedConversation(): Message | null {
    for (const appConversation of this.appConversations) {
      const elDivCOnversation = appConversation.elementDivConversation.nativeElement as HTMLDivElement;
      if (elDivCOnversation.classList.contains("selectedConversation"))
        return appConversation.conversation;
    }
    return null;
  }

  /**
   * Permet de chercher les détails d'une conversation entre deux tilisateur et
   * d'émettre une valeur pour indiquer que la conversation a été selectionnée.
   *
   * Si une recherche est en cours dans les conversations (la liste des conversations change localolement),
   * remettre le champ de recherhce à '' ce qui empêche la recherche, passer en mode false la recherche et remettre la liste des conversations à sont état d'origine avant le début de la recherhce.
   * @param message
   */
  viewConversation(message: Message) {

    if (this.userId !== null)
      this.messagerieService.getDetailsConversationBetween2User(message.expediteur_id, message.destination_id)
        .then(messagesConversation => {
          this.allMessageOfConversation = messagesConversation;
          let elementDivConversation = this.getElementConversationContentMessage(message);

          if (elementDivConversation.parentElement) {
            this.messagerieService.setSelectedConversationSubject(elementDivConversation.parentElement.id);
          }

        })
        .catch(_ => this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite, veuillez réessaiyer plus tard." }));
  }

  /**
   * appelé, après la suprision d'une conversation,
   * reçoit la "conversation" supprimé et l'"attribute id" du div qui contient la première conversation dans la liste
   * ou bien "null" si c'est la dernière conversation qui a été supprimé
   * @param params {conversationToDelete, attributeIdOfFirstConversationToDisplay}
   */
  displayConversationIfExistAfterDelete(params: { [key: string]: string | Message } | null) {

    if (params !== null) {
      let attributeIdOfFirstConversationToDisplay = params['attributeIdOfFirstConversationToDisplay'] as string;
      let conversationToDelete = params["conversationToDelete"] as Message;

      // supprimer la conversation de la liste et faire une copie
      this.allConversations = this.allConversations.filter((message: Message) => {
        if (message.id === conversationToDelete.id)
          return false;
        return true;
      })
      this.copieAllConversations = this.allConversations;

      /* chercher la conversaton qui est contenue dans l'element avec l'attribute id correspondant */
      let conversationToSee!: Message;
      for (const appConversation of this.appConversations) {
        if (appConversation.elementDivConversation.nativeElement.parentElement.id === attributeIdOfFirstConversationToDisplay) {
          conversationToSee = appConversation.conversation;
          break;
        }
      }

      this.viewConversation(conversationToSee);

    } else { // la dernière conversation à été supprimer, il ne reste plus aucune conversation.
      this.allConversations = [];
      this.copieAllConversations = this.allConversations;
      this.allMessageOfConversation = [];
      (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).setAttribute("disabled", '');
      (this.elementTextAreaMessage.nativeElement as HTMLAreaElement).nextElementSibling?.setAttribute("disabled", '');
      // (this.appDetailsConversation.elementDivMessages.nativeElement as HTMLDivElement).remove();
    }
  }
  /**
   * faire une recherche dans les conversation en utilisant les données stocker en front
   */
  selectedConversation!: Message | null;
  isSearchingConversation: boolean = false; // Utiliser pour empêcher la selection de conversation en mode recherche dans le app conversation "ngOnChanges"
  valueSearchConversation: string = '';
  searchConversation() {
    let listConversation = this.copieAllConversations;

    if (!this.isSearchingConversation) // avant de commencer la recherche ça valeur est false
      // sauvegarder la dernière conversation selectionner pour la restituer si aucune conversation n'a été selectionner après la recherche
      this.selectedConversation = this.getSelectedConversation();

    if (this.valueSearchConversation) {

      this.isSearchingConversation = true;  // aucune conversations ne sera sélectionné au moment de la recherche, jusqu'a ce qu'une conversation soit selectionnée
      scheduled(listConversation, asyncScheduler).pipe(
        filter(conversation => {
          if (conversation.expediteur_id !== this.userId) {
            return this.removeAccents(conversation.nomExpediteur.toLowerCase()).includes(this.valueSearchConversation.toLowerCase())
          }
          return this.removeAccents(conversation.nomDestination.toLowerCase()).includes(this.valueSearchConversation.toLowerCase());
        }),
        toArray()
      ).subscribe(value => this.allConversations = value)
    } else {

      this.allConversations = this.copieAllConversations;
      this.isSearchingConversation = false;
      this.valueSearchConversation = ''
      if (this.selectedConversation)
        this.viewConversation(this.selectedConversation);
    }
  }

  /**
   * Removes accents
   * @param str
   * @returns string sans accents
   */
  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  /**
   * envoyer un message en utilisant la touche entrer
   * @param [keyEnter]
   */
  sendMessage(keyEnter?: Event) {
    if (keyEnter) {
      keyEnter.preventDefault();
    }
    if (this.valueMessageTextAreaToSend !== '') {
      let body = this.valueMessageTextAreaToSend;
      let selectedConversation = this.getSelectedConversation();
      if (selectedConversation !== null) {

        let message!: Message;
        if (selectedConversation.expediteur_id === this.userId) {
          message = new Message(selectedConversation.destination_id, selectedConversation.expediteur_id);
        } else {
          message = new Message(selectedConversation.expediteur_id, selectedConversation.destination_id);
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

  /**
   * Saves message dans la BDD
   * @param message
   * @returns Promise<boolean> true si la sauvegarde c'est faites correctement, sinon flase
   */
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

  /**
   * se désabonner de tous les observables et les eventListener
   */
  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

