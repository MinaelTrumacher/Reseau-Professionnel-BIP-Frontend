import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Publication } from 'src/app/models/Publication';
import { InteractionService } from 'src/app/services/interaction.service';
import { Interaction } from 'src/app/models/Interaction';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class InteractionsComponent implements OnInit {
  @Input() publication?: Publication;
  @Input() utilisateur?: Utilisateur;
  publicationList: Publication[] = [];
  hovered: boolean = false;
  id: number | null = null;

  isFavoris: any = {value : false, name : 'favoris', id : null};
  isSignaler: any = {value : false, name : 'signaler', id : null};
  isContacter: any = {value : false, name : 'contacter', id : null};
  isPartager: any = {value : false, name : 'partager', id : null};
  isPostuler: any = {value : false, name : 'postuler', id : null};

  constructor(private route: ActivatedRoute, private interactionService: InteractionService, private utilisateurService: UtilisateurService, private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.getInteractionsForPublication();
  }

  toggleInteraction(action:any) {
    action.value = !action.value;
    if(action.value){
      this.createInteraction(action);
    }else {
      this.deleteInteraction(action.id);
    }
  }

  getInteractionsForPublication() {
    if (this.publication && this.publication.interactions) {
      this.publication.interactions.forEach(interaction => {
        switch (interaction.typeInteraction) {
          case 'favoris':
            this.isFavoris.value = true;
            this.isFavoris.id=interaction.id;
            break;
          case 'signaler':
            this.isSignaler.value = true;
            this.isSignaler.id=interaction.id;
            break;
          case 'contacter':
            this.isContacter.value = true;
            this.isContacter.id=interaction.id;
            break;
          case 'partager':
            this.isPartager.value = true;
            this.isPartager.id=interaction.id;
            break;
          case 'postuler':
            this.isPostuler.value = true;
            this.isPostuler.id=interaction.id;
            break;
          default:
            break;
        }
      });
    }
  }
  

  isInteractionDefined(interactions: Interaction[], action: string): boolean {
    return interactions.some(interaction => interaction.typeInteraction === action);
  }

  getTabClass(categorie: string): string {
    const categoryToClass: { [key: string]: string } = {
      'job_dating': 'tab-job-dating',
      'offre_stage': 'tab-offre-stage',
      'offre_emploi': 'tab-offre-emploi',
      'afterwork': 'tab-afterwork',
      'recherche_emploi': 'tab-recherche-emploi',
      'recherche_stage': 'tab-recherche-stage',
    };

    const defaultClass = 'tab-default';

    return categoryToClass[categorie] || defaultClass;
  }

  createInteraction(action: any) {
    const newInteraction: Interaction = {
      typeInteraction: action.name,
      utilisateur: { id: this.utilisateurService.userSession.userId },
      publication: { id: this.publication?.id || 0 },
    };

    this.interactionService.createInteraction(newInteraction).subscribe({
      next: (interaction: Interaction) => {
        console.log(interaction);
        action.value=true;
        action.id=interaction.id;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteInteraction(id: number) {
    this.interactionService.deleteInteraction(id).subscribe(
      () => {
        console.log(`Interaction ${id} supprimée.`);
      },
      error => {
        console.error(`Erreur lors de la suppression de l'interaction ${id} :`, error);
      }
    );
  }
}
