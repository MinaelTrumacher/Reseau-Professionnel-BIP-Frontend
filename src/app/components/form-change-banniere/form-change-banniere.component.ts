import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-form-change-banniere',
  templateUrl: './form-change-banniere.component.html',
  styleUrls: ['./form-change-banniere.component.scss']
})
export class FormChangeBanniereComponent {
  newBanniereControl = new FormControl('', Validators.required);
  urlBanniere! : string | null;

  constructor(private dialog: MatDialog, 
              private utilisateurService : UtilisateurService,
              private dialogRef: MatDialogRef<FormChangeBanniereComponent>
             ) {}

  async submitForm() {
    this.urlBanniere = this.newBanniereControl.value;
    const userId = this.utilisateurService.userSession.userId;
    
    const isValidImage = await this.checkImageURL(this.urlBanniere);
    if (!isValidImage) {
      this.openErrorUrlDialog();
    }

    if(userId != null && this.urlBanniere != null && isValidImage){
      this.utilisateurService.updateUtilisateurElement(null, this.urlBanniere, null,userId).subscribe({
        next: () => {
          this.openSuccessDialog();
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
      data: "Bannière changer avec succès !"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close(this.urlBanniere);
    });
  }

  openErrorUrlDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: "L\'URL ne renvoie pas vers une image valide."
    });
  }

  openErrorDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: "Une erreur est survenue. Veuillez réessayer plus tard !"
    });
  }
}
