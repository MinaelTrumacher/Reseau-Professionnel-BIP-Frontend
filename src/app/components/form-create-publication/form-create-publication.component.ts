import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Publication } from 'src/app/models/Publication';

@Component({
  selector: 'app-form-create-publication',
  templateUrl: './form-create-publication.component.html',
  styleUrls: ['./form-create-publication.component.scss']
})
export class FormCreatePublicationComponent implements OnInit{
  publicationList: Publication[] = [];
  newPublication: Publication = {
    title: '',
    categorie: '',
    contenu: '', 
    geolocalisation :{id:''},
    utilisateur : {id:this.utilisateurService.userSession.userId}
  };
  role = this.utilisateurService.userSession.role;

  isFormExpanded = false;
  newPublications = {
    title: '',
    categorie: '',
    contenu: ''
  };

  constructor(private publicationService: PublicationService, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
  }

  toggleForm() {
    this.isFormExpanded = !this.isFormExpanded;
  }

  addPublication() {
    console.log(this.newPublication.geolocalisation);
    var newPublication = {
      title: this.newPublication.title,
      categorie: this.newPublication.categorie,
      contenu: this.newPublication.contenu, 
      geolocalisation : {id:"1"},
      utilisateur : {id:this.utilisateurService.userSession.userId}
    };
    this.publicationService.addPublication(newPublication).subscribe({
      next: (publication: Publication) => {
       
        this.publicationList.push(publication);
        this.newPublication = {
          title: '',
          categorie: '',
          contenu: '', 
          geolocalisation : {id:''},
          utilisateur : {id:this.utilisateurService.userSession.userId}
        };
        console.log(publication);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  selectCategory(category: string) {
    this.newPublication.categorie = category;
  }

  
  
}

