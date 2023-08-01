import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CguDialogContentComponent } from 'src/app/components/cgu-dialog-content/cgu-dialog-content.component';

@Component({
  selector: 'app-cgu-dialog',
  templateUrl: './cgu-dialog.component.html',
  styleUrls: ['./cgu-dialog.component.scss']
})
export class CguDialogComponent {

  constructor(public dialog: MatDialog) {}

  openCguModal(): void {
    const dialogRef = this.dialog.open(CguDialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Formulaire fermé.`);
    });
  }
}
