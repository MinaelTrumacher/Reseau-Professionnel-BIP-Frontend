import { Component, ViewChild, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';
import { FormloginComponent } from '../form-login/form-login.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent, MatChipOption } from '@angular/material/chips';
import { PublicationService } from 'src/app/services/publication.service';
import { HeightService } from 'src/app/services/height.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) menu!: MatMenuPanel<any>;
  @ViewChild('logoElement', { static:true }) logoElement!: ElementRef;
  isLoggedIn = false;
  private isLoggedInSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog, public utilisateurService: UtilisateurService, private router: Router, private publicationService: PublicationService, private heightService: HeightService, private elementRef: ElementRef) {
    this.filtered = this.filterCtrl.valueChanges.pipe(
      startWith(null),
      map((filter: string | null) => (filter ? this._filter(filter) : this.allFilters.slice()))
    );
  }

  ngOnInit(): void {
    this.heightService.setHeaderHeightSubject(this.getHeaderHeight());
    this.isLoggedInSubscription = this.utilisateurService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      // Vous pouvez effectuer des actions supplémentaires en fonction de l'état de connexion ici
      if (isLoggedIn) {
        this.router.navigate(['/home']);
        this.logoElement.nativeElement.addEventListener('click', () => {
          console.log('Logo cliqué');
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe(); // Supprimer la souscription
    }
  }

  openFormRegister() {
    console.log('Open InscriptionComponent');
    this.dialog.open(InscriptionComponent);
  }

  openFormLogin() {
    console.log('Open FormloginComponent');
    this.dialog.open(FormloginComponent);
  }

  onClickMessage() {
    this.router.navigate(['messagerie']);
  }

  //Nettoyage token et Id user
  logoutRequest() {
    this.utilisateurService.cleanUserLogged();
    this.utilisateurService.updateIsLoggedInStatus(false); // Mettre à jour l'état de connexion
    console.log("userSession après deconnexion", this.utilisateurService.userSession)
    this.router.navigate([""]);            //Reroutage vers index
  }

  /* CHIP */
  @ViewChild('demandStage') demandStage!: MatChipOption ;
  @ViewChild('propStage') propStage!: MatChipOption ;
  @ViewChild('jobDating') jobDating!: MatChipOption ;
  @ViewChild('afterwork') afterwork!: MatChipOption ;

  /* MOTS CLÉS */

  //Afficher ou non les filtres
  isFilterVisible = false;

  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filterCtrl = new FormControl('');
  filtered: Observable<string[]>;
  filters: string[] = [];
  allFilters: string[] = ['Java EE','C#','Spring boot','Angular','Javascript','CSS','PHP','Symfony'];
  announcer = inject(LiveAnnouncer);

  /* FILTRE AVEC MOTS CLÉS */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.filters.push(value);
    }
    event.chipInput!.clear();
    this.filterCtrl.setValue(null);
  }

  remove(filter: string): void {
    const index = this.filters.indexOf(filter);
    if (index >= 0) {
      this.filters.splice(index, 1);
      this.announcer.announce(`Removed ${filter}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.filters.push(event.option.viewValue);
    this.filterInput.nativeElement.value = '';
    this.filterCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFilters.filter(filter => filter.toLowerCase().includes(filterValue));
  }

  getHeaderHeight() {
    const elementHeader = this.elementRef.nativeElement.querySelector('#header');
    return elementHeader.offsetHeight;
  }

  /* CHIP COLOR (AFTERWORK) */
  isAfterworkSelected: boolean = false;
  isJobDatingSelected: boolean = false;

  toggleSelected(n:number) {
    switch(n){
      case 1:
        this.isJobDatingSelected = !this.isJobDatingSelected;
        break;
      case 2 :
        this.isAfterworkSelected = !this.isAfterworkSelected;
        break;
    }
  }

  /* AFFICHER FILTRE */
  filtrer(){
    this.isFilterVisible = !this.isFilterVisible;
    this.isAfterworkSelected = false;
    this.isJobDatingSelected = false;
  }

  /* RECHERCHER */
  search(){
    var filtre = { types : {},keywords : {}};

    if(!this.isFilterVisible || (!this.demandStage.selected && !this.propStage.selected && !this.jobDating.selected && !this.afterwork.selected)){
      filtre["types"] = [
        "demandStage",
        "propStage",
        "jobDating",
        "afterwork"
      ];
    }else{
      filtre["types"] = [
      this.demandStage.selected ? "demandStage" : null,
      this.propStage.selected ? "propStage" : null,
      this.jobDating.selected ? "jobDating" : null,
      this.afterwork.selected ? "afterwork" : null,
      ].filter(item => item !== null);
    }
    filtre["keywords"] = this.filters;
  
    /*
    { "type" : 
        ["demandStage","propStage"],
      "keyword" : 
        ["Pain","Boulangerie"]
    }
    */

    console.log(filtre);
    this.publicationService.getPublicationWithFiltre(filtre)
    .subscribe({
    next: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
    });
  }
}

