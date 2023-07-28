import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/message';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DialogMessagerieComponent } from '../dialogs/dialog-messagerie/dialog-messagerie.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {

  @Input() isSearchConversation!: boolean;
  @Input() isSelectedConversation!: boolean;
  @Input() conversation!: Message;

  @Output() onVoirConversation = new EventEmitter<void>();
  @Output() onDeleteConversation = new EventEmitter<{ [key: string]: string | Message } | null>();

  @ViewChild('elementDivConversation') elementDivConversation!: ElementRef;

  private ngUnsubscribe = new Subject<void>();

  userId!: number | null;
  messageVu: boolean = true;

  constructor(
    private messagerieService: MessagerieService,
    private utilisateurService: UtilisateurService,
    public dialog: MatDialog
  ) { }

  ngOnChanges() {
    if (this.isSearchConversation) this.isSelectedConversation = false;
  }

  ngOnInit() {
    this.messagerieService.SelectedConversationSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(attributeIdOfSelectConversation => {
      if (this.elementDivConversation.nativeElement.parentElement.id === attributeIdOfSelectConversation) { this.isSelectedConversation = true }
      else { this.isSelectedConversation = false }
    });

    this.userId = this.utilisateurService.userSession.userId;

    if (this.conversation.expediteur_id != this.userId) this.messageVu = this.conversation.vu;
  }

  clickConversation(conversation: Message) {

    if (this.messageVu == false) {
      this.messageVu = true;
      this.messagerieService.updateMessageConversation(conversation)
    }
    this.onVoirConversation.emit();
  }

  deleteConversation(conversation: Message) {
    if (this.userId !== null)
      this.messagerieService.deleteConversation(conversation, this.userId)
        .then(response => {

          if (response.status == 200) {
            let elementDivAllConversations = this.elementDivConversation.nativeElement.parentElement.parentElement;
            let elementAppConversation = this.elementDivConversation.nativeElement.parentElement;

            elementAppConversation.remove();

            if (elementDivAllConversations.firstElementChild !== null) {
              this.onDeleteConversation.emit({ 'attributeIdOfFirstConversationToDisplay': elementDivAllConversations.firstElementChild.id, 'conversationToDelete': conversation });
              this.messagerieService.setSelectedConversationSubject(elementDivAllConversations.firstElementChild.id);
            } else {
              this.onDeleteConversation.emit(null);
            }
          };
        })
        .catch(_ => {
          this.dialog.open(DialogMessagerieComponent, { data: "Une erreur s'est produite ! le conversation n'a pas été supprimé." })
        });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
