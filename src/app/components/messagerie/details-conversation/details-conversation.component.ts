
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/message';
import { HeightService } from 'src/app/services/height.service';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DialogMessagerieComponent } from '../dialogs/dialog-messagerie/dialog-messagerie.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details-conversation',
  templateUrl: './details-conversation.component.html',
  styleUrls: ['./details-conversation.component.scss']
})
export class DetailsConversationComponent {

  private ngUnsubscribe = new Subject<void>();
  userId!: number | null;
  headerHeight!: number;
  footerHeight!: number;
  @Input() conversation!: Message[];
  @Input() headerAndFooterHeightOfDetailsConversation!: number;
  @ViewChild('elementDivMessages') elementDivMessages!: ElementRef;

  constructor(
    private messagerieService: MessagerieService,
    private heightService: HeightService,
    private utilisateurService: UtilisateurService,
    public dialog: MatDialog
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

  ngAfterViewChecked() {
    let div = this.elementDivMessages.nativeElement as HTMLDivElement;

    // console.log(div.scrollTop ,div.scrollHeight, div.clientHeight, (div.scrollHeight- div.clientHeight));

    div.scrollTo(0, div.scrollHeight - div.clientHeight);
  }

  onDeleteMessage(message: Message, elementDivContentMessage: HTMLDivElement) {

    this.messagerieService.deleteMessageConversation(message).
      then(response => {
        if (response.status == 200)
          elementDivContentMessage.remove();
      }
      ).catch(_ => {
        this.dialog.open(DialogMessagerieComponent, { data: "Erreur le message que vous essauyer de supprimer n'éxiste plus !" })
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
