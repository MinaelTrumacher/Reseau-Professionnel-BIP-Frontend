import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  formulaire!: FormGroup;
  raison_social: any;
  utilisateur! : Utilisateur ;
  villes: { id: string, ville: string }[] = [];
  errorMessage = '';
  cguChecked = false;
  hidePwd = true;
  hidePwdConfirm = true;

  constructor(private snackBar: MatSnackBar,private utilisateurservice : UtilisateurService , private dialog: MatDialog,
    private formBuilder: FormBuilder) { 
    }

    ngOnInit(): void {
      this.formulaire = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        role: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        emailConfirm: ['',[
          Validators.required,
          this.matchValues('email'),
        ]],
        mdp: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/)
        ]],
        mdpConfirm: ['',[
            Validators.required,
            this.matchValues('mdp'),
        ]],
        //siren: ['', [Validators.required, Validators.pattern(/^(?:\d{9}|\d{3}\s\d{3}\s\d{3})$/)]],
        //raison_social: ['', Validators.required],
        codePostal: ['', Validators.required],
        ville: ['', Validators.required],
      });

    }
    openCgu(event: Event){
      this.dialog.open(ModalCguComponent);
    }


    register() {
      // Récupérer les valeurs du formulaire
      console.log(this.formulaire.value);
      const { nom, prenom, role, email, mdp, ville } = this.formulaire.value;

      this.utilisateur = {
        id : 0,
        nom,
        prenom,
        role,
        email,
        mdp,
        description : "",
        etatInscription : "",
        geolocalisation: {
          id: ville,         
        }
      };
      console.log(this.utilisateur);
      this.utilisateurservice.createUtilisateur(this.utilisateur)
        .subscribe({
          next: () => {
            console.log('Utilisateur enregistré avec succès !');
            this.cancel();
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
    

  cancel(): void {
    this.dialog.closeAll(); 
  }

getVille(codePostal: string): void {
  if(codePostal.length == 5 )
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

matchValues(
  matchTo: string // name of the control to match to
): (AbstractControl:any) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const parentControls = control.parent?.controls as { [key: string]: AbstractControl<any> };
    return !!control.parent &&
      !!control.parent.value &&
      control.value === parentControls[matchTo].value
      ? null
      : { isMatching: false };
  };
}

}
