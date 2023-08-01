import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-credits-dialog',
  templateUrl: './credits-dialog.component.html',
  styleUrls: ['./credits-dialog.component.scss'],
})
export class CreditsDialogComponent {
  
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreditsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
