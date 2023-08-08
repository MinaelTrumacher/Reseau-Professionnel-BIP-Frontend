import { Component} from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { OnInit } from '@angular/core';
import { Publication } from 'src/app/models/Publication';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private publicationService  : PublicationService,
              private utilisateurService  : UtilisateurService
             ) { }

   publicationList: Publication[] = [];

   ngOnInit() {
    this.getAllPublications();
   }

   public getAllPublications(){
    this.publicationService.getAllPublications().subscribe({
      next: (publications: Publication[]) => {
        console.log(publications);
        this.publicationList = publications;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public getAllPublicationsByRole(){
    console.log();
    var types;
    switch(this.utilisateurService.userSession.role){
      case "PADAWAN":
        types = ['job_dating', 'offre_stage', 'offre_emploi'];
        break;
      case "JEDI":
        types = ['job_dating', 'offre_stage', 'offre_emploi'];
        break;
      case "PALPATINE": 
        types = ['job_dating', 'offre_stage', 'offre_emploi'];
        break;
      default:
        types = [];
        break;
    }

    var filtre = {
                keywords : [],
                types : ['job_dating', 'offre_stage', 'offre_emploi'],
                villes : []
               };
    this.publicationService.getPublicationWithFiltre(filtre).subscribe({
      next: (publications: Publication[]) => {
        console.log(publications);
        this.publicationList = publications;
      },
      error: (error) => {
        console.error(error);
      }
    });

  }
   
}

