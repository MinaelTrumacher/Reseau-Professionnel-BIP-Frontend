import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  nomControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  messageControl = new FormControl('', Validators.required);
  prenomControl = new FormControl('', Validators.required);

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  submitForm(): void {
      const formData = {
      nom: this.nomControl.value,
      prenom: this.prenomControl.value,
      email: this.emailControl.value,
      message: this.messageControl.value
    };

    this.http.post(environment.url + '/contact', formData).subscribe({
      next: () => {
        this.openSuccessDialog();
      },
      error: (error) => {
        this.openErrorDialog();
        console.log("Erreur lors de l'envoi du formulaire", error);
      }
    });
  };

  openSuccessDialog(): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: "Le formulaire a été envoyé avec succès !"
    });
  }

  openErrorDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer plus tard !"
    });
  }
}

