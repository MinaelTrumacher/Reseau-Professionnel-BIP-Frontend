import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-form-change-pp',
  templateUrl: './form-change-pp.component.html',
  styleUrls: ['./form-change-pp.component.scss']
})
export class FormChangePpComponent {
  newPPControl = new FormControl('', Validators.required);
  urlPhoto!: string | null;

  constructor(private dialog: MatDialog,private utilisateurService : UtilisateurService,private dialogRef: MatDialogRef<FormChangePpComponent>  ) {}

  async submitForm() {
    this.urlPhoto = this.newPPControl.value;
    const userId = this.utilisateurService.userSession.userId;
    
    const isValidImage = await this.checkImageURL(this.urlPhoto);
    if (!isValidImage) {
      this.openErrorUrlDialog();
    }

    if(userId != null && this.urlPhoto != null && isValidImage){
      this.utilisateurService.updateUtilisateurElement(this.urlPhoto, null, null,userId).subscribe({
        next: (result) => {
          this.openSuccessDialog();
          console.log(result);
        },
        error: (error) => {
          this.openErrorDialog();
          console.log("Erreur lors de l'envoi du formulaire", error);
        }
      });
    }
  }

  checkImageURL(imageUrl: string | null): Promise<boolean> {
    if (imageUrl !== null && imageUrl.startsWith('http')) {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imageUrl;
      });
    } else {
      return Promise.resolve(false);
    }
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: "Photo de profil changer avec succès !"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close(this.urlPhoto);
    });
  }

  openErrorUrlDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: "L\'URL ne renvoie pas vers une image valide."
    });
  }

  openErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: "Une erreur est survenue. Veuillez réessayer plus tard !"
    });
  }

}
