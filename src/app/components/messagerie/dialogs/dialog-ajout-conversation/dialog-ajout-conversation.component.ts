import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, catchError, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { UtilisateurDtoMessage } from 'src/app/models/Message';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-dialog-ajout-conversation',
  templateUrl: './dialog-ajout-conversation.component.html',
  styleUrls: ['./dialog-ajout-conversation.component.scss']
})
export class DialogAjoutConversationComponent {
  private ngUnsubscribe = new Subject<void>();
  private searchTermsSubject = new Subject<string>();

  searchTermSubject$ = this.searchTermsSubject.asObservable();
  listUtilisateurDtoMessages!: UtilisateurDtoMessage[];
  private oldUlElementUserSelected!: HTMLUListElement;
  userId!: number | null;

  constructor(
    public dialogRef: MatDialogRef<DialogAjoutConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public utilisateurDtoMessage: UtilisateurDtoMessage,
    private messagerieService: MessagerieService,
    private utilisateurService: UtilisateurService
  ) { }

  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    contenu: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.userId = this.utilisateurService.userSession.userId;
    this.searchTermSubject$.pipe(takeUntil(this.ngUnsubscribe)).pipe(
      debounceTime(400),
      switchMap<string, Observable<UtilisateurDtoMessage[] | HttpErrorResponse>>(termOfSearch => {
        return this.messagerieService.getUsersByFirstnameOrLastname(termOfSearch).pipe(
          catchError(error => of(error))
        )
      })
    ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        this.listUtilisateurDtoMessages = [];

      } else {
        this.listUtilisateurDtoMessages = response;
      }
    })
  }

  onInputSearchChange() {
    if (this.utilisateurDtoMessage.nomDestination) {
      this.setSearchSubject(this.utilisateurDtoMessage.nomDestination);
    }
  }

  setSearchSubject(termOfSearch: string): void {
    this.searchTermsSubject.next(termOfSearch);
  }

  selectedDistinataire(utilisateur: UtilisateurDtoMessage, ulElementUserSelected: HTMLUListElement) {
    if (this.oldUlElementUserSelected) {
      this.oldUlElementUserSelected.classList.remove('selectedUser');
    }
    ulElementUserSelected.classList.add('selectedUser');
    this.utilisateurDtoMessage.id = utilisateur.id;
    this.utilisateurDtoMessage.nomDestination = utilisateur.nomDestination;
    this.oldUlElementUserSelected = ulElementUserSelected;
  }

  onAnnuler(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
