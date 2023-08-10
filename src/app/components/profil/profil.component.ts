import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Observer } from 'rxjs';
import { Publication } from 'src/app/models/Publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit{
  
  constructor(private utilisateurService  : UtilisateurService ,private publicationService : PublicationService) { }

   utilisateur : Utilisateur | undefined;
   publicationList: Publication[] = [];
   favorisList: Publication[] = [];
   selectedTab: 'posts' | 'favoris' = 'posts'; 

  ngOnInit() {
    const userId = this.utilisateurService.userSession.userId;

    if (userId !== null) {
      this.getUtilisateur(userId);
      this.getPublicationsList(userId);
      this.getFavoris(userId);
    }

    function adjustNameMargin(){
      const nameElement = document.getElementById("name");
      if (!nameElement) return;
    
      const name = nameElement.textContent || nameElement.innerText;
      const nameLength = name.length;
      const maxNameLength = 15;
      const maxNameLengthPlus = 17;
    
      if (nameLength > maxNameLengthPlus) {
        const newMargin = -2; // Adjust the margin value as per your preference
        nameElement.style.marginLeft = newMargin + "rem";
      } else if (nameLength > maxNameLength) {
        const newMargin = -1; // Adjust the margin value as per your preference
        nameElement.style.marginLeft = newMargin + "rem";
      } else {
        nameElement.style.marginLeft = "0rem";
      }
    }
    
    document.addEventListener("DOMContentLoaded", function () {
      adjustNameMargin();
    
      window.addEventListener("resize", adjustNameMargin);
    });
    
  }

  showPosts() {
    this.selectedTab = 'posts';
  }

  showFavoris() {
    this.selectedTab = 'favoris';
  }

  getUtilisateur(id: number) {
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (utilisateur: Utilisateur) => {
        console.log(utilisateur);
        this.utilisateur = utilisateur;
      },
      error: (error) => {
        console.error(error);
      }
    } as Observer<Utilisateur>);
  }

  getPublicationsList(id: number) {
    this.publicationService.getPublicationsList(id).subscribe({
      next: (publications: Publication[]) => {
        console.log(publications);
        this.publicationList = publications;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getFavoris(id: number) {
    this.publicationService.getAllFavoris(id).subscribe({
      next: (publications: Publication[]) => {
        console.log(publications);
        this.favorisList = publications; 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
}



