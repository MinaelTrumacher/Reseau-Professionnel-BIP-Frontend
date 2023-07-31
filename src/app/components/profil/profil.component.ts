import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit{
  
  constructor(private utilisateurService  : UtilisateurService) { }

   utilisateur : Utilisateur | undefined;

  ngOnInit() {
    const userId = this.utilisateurService.userSession.userId;

    if (userId !== null) {
      this.getUtilisateur(userId);
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
}



