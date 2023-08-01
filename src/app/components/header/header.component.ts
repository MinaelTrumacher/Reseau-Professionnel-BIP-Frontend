import { Component, ViewChild, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { FormRegisterComponent } from '../form-register/form-register.component';
import { MatDialog } from '@angular/material/dialog';
import { FormLoginComponent } from '../form-login/form-login.component';
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
import { MatSelect } from '@angular/material/select';

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

  constructor(private dialog: MatDialog, public utilisateurService: UtilisateurService, 
              private router: Router, private publicationService: PublicationService, 
              private heightService: HeightService, private elementRef: ElementRef,
              private utilisateurservice : UtilisateurService) {
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
    console.log('Open FormRegisterComponent');
    this.dialog.open(FormRegisterComponent);
  }

  openFormLogin() {
    console.log('Open FormLoginComponent');
    this.dialog.open(FormLoginComponent);
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
  @ViewChild('jobDating') jobDating!: MatChipOption ;
  @ViewChild('offreStage') offreStage!: MatChipOption ;
  @ViewChild('offreEmploi') offreEmploi!: MatChipOption ;
  @ViewChild('afterwork') afterwork!: MatChipOption ;
  @ViewChild('rechercheStage') rechercheStage!: MatChipOption ;
  @ViewChild('rechercheEmploi') rechercheEmploi!: MatChipOption ;
   
   /* SELECT VILLE */
   @ViewChild('idVille') idVille!: MatSelect;

  
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

  /* COULEUR CHIP */
  isJobDatingSelected: any = {value : false};
  isOffreStageSelected: any = {value : false};
  isOffreEmploiSelected: any = {value : false};
  isAfterworkSelected: any = {value : false};
  isRechercheStageSelected: any = {value : false};
  isRechercheEmploiSelected: any = {value : false};

  toggleSelected(isChipSelected:any) {
    isChipSelected.value = !isChipSelected.value;
  }

  /* AFFICHER FILTRE */
  filtrer(){
    this.isFilterVisible = !this.isFilterVisible;
    this.isJobDatingSelected.value = false;
    this.isOffreStageSelected.value = false;
    this.isOffreEmploiSelected.value = false;
    this.isAfterworkSelected.value = false;
    this.isRechercheStageSelected.value = false;
    this.isRechercheEmploiSelected.value = false;
  }

  /* RECHERCHER */
  search(){
    var filtre = { types : {},keywords : {},ville : {}};

    //Recuperation des types de publications
    if(!this.isFilterVisible || (!this.jobDating.selected && !this.offreStage.selected && !this.offreEmploi.selected && !this.afterwork.selected && !this.rechercheStage.selected && !this.rechercheEmploi.selected)){
      filtre["types"] = [
        "jobDating",
        "offreStage",
        "offreEmploi",
        "afterwork",
        "rechercheStage",
        "rechercheEmploi",
      ];
    }else{
      filtre["types"] = [
      this.jobDating.selected ? "jobDating" : null,
      this.offreStage.selected ? "offreStage" : null,
      this.offreEmploi.selected ? "offreEmploi" : null,
      this.afterwork.selected ? "afterwork" : null,
      this.rechercheStage.selected ? "rechercheStage" : null,
      this.rechercheEmploi.selected ? "rechercheEmploi" : null,
      ].filter(item => item !== null);
    }

    //Recuperation des mots-clés
    filtre["keywords"] = this.filters;

    //Recuperation de la ville
    filtre["ville"] = this.idVille !== undefined && this.idVille.value !== undefined ? [this.idVille.value] : [0];

    /*
    { "type" : 
        ["demandStage","propStage"],
      "keyword" : 
        ["Pain","Boulangerie"],
      "ville" :
        1
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

  /*FILTRE avec ville */

  villes: { id: string, ville: string }[] = [];

  getVille(codePostal: string): void {
    if(codePostal.length == 5 )
      this.utilisateurservice.getVilleByCodePostal(codePostal).subscribe({
        next: (response: any) => {
          console.log(response);
          this.villes = response.map((ville: any) => ({
            id: ville.id,
            ville: ville.ville
          }));
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }
}

