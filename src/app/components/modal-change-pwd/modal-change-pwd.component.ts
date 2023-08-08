import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  template: `
    <h2>Message</h2>
    <p>{{ data.message }}</p>
    <button mat-button [mat-dialog-close]="'close'">Fermer</button>
  `,
})
export class ModalChangePwdComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
