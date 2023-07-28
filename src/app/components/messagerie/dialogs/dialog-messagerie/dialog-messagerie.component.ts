import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-messagerie',
  templateUrl: './dialog-messagerie.component.html',
  styleUrls: ['./dialog-messagerie.component.scss']
})
export class DialogMessagerieComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogMessagerieComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
  ) { }
}
