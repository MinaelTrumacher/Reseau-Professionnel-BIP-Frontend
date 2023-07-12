import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Utilisateur } from 'src/app/models/Utilisateur_Inscription';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ModalCguComponent } from '../modal-cgu/modal-cgu.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent{

  formulaire: FormGroup;
  raison_social: any;
  utilisateur! : Utilisateur ;
  villes: { id: string, ville: string }[] = [];
  errorMessage: string = '';
  cguChecked: boolean = false;


  constructor(private snackBar: MatSnackBar,private utilisateurservice : UtilisateurService , private dialog: MatDialog, private http: HttpClient,
    private formBuilder: FormBuilder) { 

      this.formulaire = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mdp: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z]).*$'),
          Validators.pattern('^(?=.*\\d)(?=.*[!@#$%^&()\\-_=+{};:,<.>]).*$')
        ]],
        
        description: [''],
        siren: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
        raison_social: ['', Validators.required],
        codePostal: ['', Validators.required],
        ville: ['', Validators.required],
      
      });

    }
    OpenCgu(){
      this.dialog.open(ModalCguComponent);
    }


    Enregistrer() {
        // Vérifier si la case CGU est cochée
      if (!this.cguChecked) {
       // console.log("Veuillez accepter les CGU pour continuer.");
        return; // Sortir de la méthode sans enregistrer
      }
      // Récupérer les valeurs du formulaire
      const { nom, prenom, role, email, mdp, description, siren,raison_social, codePostal, ville, idVille } = this.formulaire.value;

      this.utilisateur = {
        nom,
        prenom,
        role,
        email,
        mdp,
        description,
        entreprise: {
          siren,
          raisonSociale : raison_social
        },
        geolocalisation: {
          id: ville,         
        }
      };
      //console.log(this.utilisateur);
      this.utilisateurservice.AjouterUtilisateur(this.utilisateur)
        .subscribe({
          next: () => {
            console.log('Utilisateur enregistré avec succès !');
            this.annuler();
            this.snackBar.open("Un e-mail de confirmation a été envoyé. Veuillez confirmer votre inscription.", "Fermer", {
              duration: 50000, 
              verticalPosition: 'top',
            });
          },
          error: (error) => {
            if (error.status === 409) {
              this.formulaire.get('email')?.setErrors({ '409': true });
              console.error('Erreur lors de l\'enregistrement de l\'utilisateur : Email déjà existant.');
            } else {
              console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
            }
          }
        });
    }
    

  annuler(): void {
    this.dialog.closeAll(); 
  }


  searchEntreprise() {
    const siren = this.formulaire.get('siren')?.value;
    if (siren && siren.length === 9) {
      const endpoint = "https://api.insee.fr/entreprises/sirene/V3/siren/";
      const filter = "?date=2022-01-01&champs=denominationUniteLegale%2C%20siren";
      const token = "6975ba9d-5424-3644-9378-5cf27640b58b";
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      this.http.get(endpoint + siren + filter, { headers }).subscribe({
        next: (response: any) => {
          this.raison_social = response;

          if (this.formulaire.value['raisonSociale'] !== response?.denominationUniteLegale) {
            this.formulaire.value['raisonSociale'] = response?.denominationUniteLegale;
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la recherche de l\'entreprise :', error);
          this.raison_social = null;
        }
      });
    } else {
      this.raison_social = null;
    }
  }


getVille(codePostal: string): void {
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
