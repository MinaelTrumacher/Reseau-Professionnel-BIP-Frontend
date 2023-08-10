import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, takeUntil } from 'rxjs';
import { UtilisateurDestinataireMessage } from 'src/app/models/message';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-dialog-ajout-conversation',
  templateUrl: './dialog-ajout-conversation.component.html',
  styleUrls: ['./dialog-ajout-conversation.component.scss']
})
export class DialogAjoutConversationComponent {
  private ngUnsubscribe = new Subject<void>();

  private searchTermSubject = new Subject<string>();
  searchTermSubject$ = this.searchTermSubject.asObservable();
  setSearchSubject(termOfSearch: string): void {
    this.searchTermSubject.next(termOfSearch);
  }

  listUtilisateurDestinataireMessage!: UtilisateurDestinataireMessage[];
  private oldUlElementUserSelected!: HTMLUListElement;
  userId!: number | null;

  constructor(
    public dialogRef: MatDialogRef<DialogAjoutConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public utilisateurDestinataireMessage: UtilisateurDestinataireMessage,
    private messagerieService: MessagerieService,
    private utilisateurService: UtilisateurService
  ) { }

  form = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    contenu: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.userId = this.utilisateurService.userSession.userId;
    this.searchTermSubject$.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(400),
      switchMap<string, Observable<UtilisateurDestinataireMessage[] | HttpErrorResponse>>(termOfSearch => {
        return this.messagerieService.getUsersByFirstnameOrLastname(termOfSearch).pipe(
          catchError(error => of(error))
        )
      })
    ).subscribe(response => {
      if (response instanceof HttpErrorResponse) {
        this.listUtilisateurDestinataireMessage = [];

      } else {
        this.listUtilisateurDestinataireMessage = response;
      }
    })

    this.form.valueChanges.pipe(
        takeUntil(this.ngUnsubscribe),
        map(data => data.contenu as string),
        filter(contenu=> contenu !==''),
        distinctUntilChanged(),
      ).subscribe(contenuMessage => {
        this.utilisateurDestinataireMessage.contenu = contenuMessage;
      })
  }

  onInputSearchChange() {
    if (this.form.value.nom) {
      this.setSearchSubject(this.form.value.nom);
    }
  }

  selectedDistinataire(utilisateur: UtilisateurDestinataireMessage, ulElementUserSelected: HTMLUListElement) {
    if (this.oldUlElementUserSelected) {
      this.oldUlElementUserSelected.classList.remove('selectedUser');
    }
    ulElementUserSelected.classList.add('selectedUser');
    this.utilisateurDestinataireMessage.id = utilisateur.id;
    this.utilisateurDestinataireMessage.nomDestination = utilisateur.nomDestination;
    this.oldUlElementUserSelected = ulElementUserSelected;

    let inputNom = this.form.get('nom');
    if (inputNom)
      inputNom.setValue(`${this.utilisateurDestinataireMessage.nomDestination}`)
  }

  onAnnuler(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
