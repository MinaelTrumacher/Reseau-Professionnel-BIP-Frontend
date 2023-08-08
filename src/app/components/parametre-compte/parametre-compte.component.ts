import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Subscription, catchError } from 'rxjs';
import { matchValues } from 'src/app/functions/matchTo';
import { EncryptionService } from 'src/app/services/encryption.service';
import { changeMdp } from 'src/app/models/changeMdp.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalChangePwdComponent } from '../modal-change-pwd/modal-change-pwd.component';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-parametre-compte',
  templateUrl: './parametre-compte.component.html',
  styleUrls: ['./parametre-compte.component.scss']
})

export class ParametreCompteComponent implements OnInit {
  @Output() accountDeleted = new EventEmitter<void>();
  infoForm!: FormGroup;
  mdpForm!: FormGroup;
  utilisateur!: Utilisateur;
  isEditing: boolean = false;
  displayChangePasswordForm: boolean = false;
  villes: any;
  credentials: { username: string; password: string; } | undefined;

  constructor(
    private utilisateurService: UtilisateurService,
    private formBuilder: FormBuilder,
    private encryptService: EncryptionService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private router: Router) {}

  ngOnInit(): void {
    // Vérifier si l'ID de l'utilisateur est disponible
    const userId = this.utilisateurService.userSession.userId;
    if (userId !== null) {
      this.utilisateurService.getUtilisateur(userId).pipe(
        catchError(error => {
          console.log("Error retrieving data:", error);
          // Vous pouvez également afficher un message d'erreur ici pour informer l'utilisateur
          return [];
        })
      ).subscribe((user: Utilisateur) => {
        this.utilisateur = user;
        this.initializeForm();
      });
    } else {
      // Gérer le cas où l'ID de l'utilisateur est null
      console.log("L'ID de l'utilisateur est null.");
      // Vous pouvez également afficher un message d'erreur ici pour informer l'utilisateur
    }
  }

  initializeForm() {
    // Initialisez le formulaire avec les informations actuelles de l'utilisateur.
    if (this.utilisateurService.userSession.userId) {
      let userId = this.utilisateurService.userSession.userId;
      console.log(userId);
      this.utilisateurService.getUtilisateur(userId).subscribe({
        next: (user: Utilisateur) => {
          this.utilisateur = user;
          this.infoForm = this.formBuilder.group({
            nom: [this.utilisateur?.nom || '', Validators.required],
            prenom: [this.utilisateur?.prenom || '', Validators.required],
            codePostal: [this.utilisateur?.geolocalisation?.codePostal || '', Validators.required],
            ville: [this.utilisateur?.geolocalisation?.id || '', Validators.required],
            email: [this.utilisateur?.email || '', [Validators.required, Validators.email]],
          });
        
          this.mdpForm = this.formBuilder.group({
            ancienMdp: ['', Validators.required],
            nouveauMdp: ['', Validators.compose([
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(50),
              Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/)
            ])],
            confirmerNouveauMdp: ['', Validators.compose([
              Validators.required,
              matchValues('nouveauMdp')
            ])]
          });
          this.infoForm.disable();
          this.mdpForm.disable();
        },
        error: (error) => {
          console.log('Erreur lors de la récupération des données :', error);
        }
      });
    }
  }

  startEditing() {
    this.isEditing = true;
    this.infoForm.enable();
    console.log(this.utilisateurService.userSession.userId);
  }

  startEditingPwd() {
    try {
      this.displayChangePasswordForm = true;
      console.log(this.displayChangePasswordForm);
      console.log("ça marche");
      this.mdpForm.enable();
    } catch (error) {
      console.error("Une erreur s'est produite dans la fonction startEditingPwd() :", error);
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.infoForm.disable();
  }

  saveChangesPwd() {
    if (this.mdpForm.valid) {
      const { ancienMdp, nouveauMdp } = this.mdpForm.value;
      const ancienMdpEncrypt = this.encryptService.encryption(ancienMdp);
      const nouveauMdpEncrypt = this.encryptService.encryption(nouveauMdp);

      const passwordUpdate: changeMdp = {
        ancienMdp: ancienMdpEncrypt,
        nouveauMdp: nouveauMdpEncrypt
      } 

      this.utilisateurService.changePassword(passwordUpdate).subscribe({
        next: (response: any) => {
          const message = response.message; // en JSON !!
          console.log(response);
          const dialogRef = this.dialog.open(ModalChangePwdComponent, {
            width: '400px',
            data: {message: message}
          })
          this.mdpForm.reset();
        },
        error: (error: any) => {
          console.log("Un problème est survenu durant la modification de votre mot de passe.", error);
        }
      })
    }
  }

  saveChangesNoPwd() {
    if (this.infoForm.valid) {
      // Récupérer les nouvelles valeurs du formulaire
      const { nom, prenom, codePostal, ville, email } = this.infoForm.value; 
      // Mettre à jour les informations de l'utilisateur
      this.utilisateur.nom = nom;
      this.utilisateur.prenom = prenom;
      this.utilisateur.geolocalisation = {
        // codePostal: codePostal,
        id: ville
      };
      this.utilisateur.email = email;

      // Appeler le service pour mettre à jour l'utilisateur
      const userId = this.utilisateurService.userSession.userId;
      console.log(this.utilisateur);
      console.log(this.infoForm);
      if(userId != null) {
       const subscription: Subscription = this.utilisateurService.updateUtilisateur(this.utilisateur, userId).subscribe({
          next: (updatedUser: Utilisateur) => {
          console.log("Informations de l'utilisateur mises à jour avec succès !");
          this.isEditing = false;
          this.infoForm.disable(); // Désactiver les champs du formulaire après la mise à jour
          this.initializeForm();
        },
        error: (error: any) => {
          console.error("Erreur lors de la mise à jour des informations de l'utilisateur :", error);
        }
      });
      }
      else {
        console.log("L'id de l'utilisateur est null.");
      }
    }
  }

  getVille(codePostal: string): void {
    if(codePostal.length == 5 )
      this.utilisateurService.getVilleByCodePostal(codePostal).subscribe({
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

  deleteAccount() {
    const userId = this.utilisateurService.userSession.userId;
    if (userId != null) {
      const subscription: Subscription = this.utilisateurService.deleteUtilisateur(userId, this.utilisateur).subscribe({
        next: () => {
          console.log(`Compte utilisateur supprimé avec succès!`);
          localStorage.removeItem('token');
          sessionStorage.clear();
          this.utilisateurService.cleanUserLogged();
          this.modalService.closeDialog();
          this.router.navigate(['/index']);
        },
        error: (error: any) => {
          console.error("Erreur lors de la suppression du compte utilisateur :", error);
        }
      });
    }
  }
}
