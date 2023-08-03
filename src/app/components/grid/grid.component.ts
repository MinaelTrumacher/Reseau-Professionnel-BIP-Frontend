import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Publication } from 'src/app/models/Publication';
import { Tile } from 'src/app/models/Tile';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

   constructor(private publicationService: PublicationService, private utilisateurService: UtilisateurService) { }

  publicationList: Publication[] = [];
  newPublicationContent: string = '';
  tiles: Tile[] = [];

  ngOnInit() {
      const userId = this.utilisateurService.userSession.userId;
      if (userId !== null) {
        this.getPublicationsList(userId);
      }
  }
  
  getPublicationsList(id: number) {
    this.publicationService.getPublicationsList(id).subscribe({
      next: (publications: Publication[]) => {
        console.log(publications);
        this.publicationList = publications;
        this.generateTiles(publications);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addPublication() {
    const newPublication: Publication = {
      title: '',
      categorie: '',
      contenu: this.newPublicationContent,
      geolocalisation :{id:''},
      utilisateur :{id:this.utilisateurService.userSession.userId},
    };

    this.publicationService.addPublication(newPublication).subscribe({
      next: (publication: Publication) => {
        console.log(publication);
        this.publicationList.push(publication);
        this.newPublicationContent = '';
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
      console.log(publication.categorie)
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
