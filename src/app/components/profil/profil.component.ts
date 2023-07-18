import { Component, OnInit } from '@angular/core';
import { UtilisateurService, Utilisateurs} from 'src/app/services/utilisateur.service';
import { Observer } from 'rxjs';




@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit{
  

  constructor(private utilisateurService  : UtilisateurService) { }

  utilisateurList: Utilisateurs[] | undefined;

  ngOnInit() {
    const id = 2; // Remplacez 1 par la logique pour récupérer l'ID de session
  
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (utilisateur: Utilisateurs) => { 
        this.getUtilisateur(utilisateur.id); 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  getUtilisateur(id: number) {
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (utilisateur: Utilisateurs) => {
        console.log(utilisateur);
        this.utilisateurList = [utilisateur];
      },
      error: (error) => {
        console.error(error);
      }
    } as Observer<Utilisateurs>);
  }
}



