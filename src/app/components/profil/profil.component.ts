import { Component, OnInit } from '@angular/core';
import { UtilisateurService, } from 'src/app/services/utilisateur.service';
import { Observer } from 'rxjs';
import { Utilisateur } from 'src/app/models/Utilisateur_Inscription';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit{
  

  constructor(private utilisateurService  : UtilisateurService) { }

  utilisateurList: Utilisateur[] | undefined;

  ngOnInit() {
    const id = 2; // Remplacez 1 par la logique pour récupérer l'ID de session
  
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (utilisateur: Utilisateur) => { 
        this.getUtilisateur(utilisateur.id); 
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  getUtilisateur(id: number) {
    this.utilisateurService.getUtilisateur(id).subscribe({
      next: (utilisateur: Utilisateur) => {
        console.log(utilisateur);
        this.utilisateurList = [utilisateur];
      },
      error: (error) => {
        console.error(error);
      }
    } as Observer<Utilisateur>);
  }
}



