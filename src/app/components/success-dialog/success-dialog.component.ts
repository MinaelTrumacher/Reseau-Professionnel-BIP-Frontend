import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h2 mat-dialog-title>Succès</h2>
    <mat-dialog-content>{{ data }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>
  `,
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
}
