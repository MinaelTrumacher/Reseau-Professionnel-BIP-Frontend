import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Publication } from 'src/app/models/Publication';
import { Tile } from 'src/app/models/Tile';

@Component({
  selector: 'app-form-create-publication',
  templateUrl: './form-create-publication.component.html',
  styleUrls: ['./form-create-publication.component.scss']
})
export class FormCreatePublicationComponent implements OnInit{
  publicationList: Publication[] = [];
  tiles: Tile[] = [];
  newPublication: Publication = {
    title: '',
    categorie: '',
    contenu: '', 
    geolocalisation :{id:''},
    utilisateur : {id:this.utilisateurService.userSession.userId}
  };

  constructor(private publicationService: PublicationService, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
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
        this.generateTiles(this.publicationList); // Regenerate tiles after adding a new publication
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
  generateTiles(publications: Publication[]) {
    this.tiles = [];
    const categoryToColor: { [key: string]: string } = {
      'job_dating': '#86BB24',
      'offre_stage': '#FFD500',
      'offre_emploi': '#596392',
      'afterwork':'#E3007E',
      'recherche_stage':'#23BCEC',
      'recherche_emploi':'#19647E'
    };

    // Add a tile for each publication
    publications.forEach((publication) => {
      const color = categoryToColor[publication.categorie]
      this.tiles.push({
        text: publication.contenu,
        cols: 3, // Adjust the number of columns as per your requirement
        rows: 3, // Adjust the number of rows as per your requirement
        color: color,
        title: publication.title,         // Set the title property
      category: publication.categorie,  // Set the category property
      });
    });
  }
}

