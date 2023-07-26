import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCguContentComponent } from 'src/app/components/modal-cgu-content/modal-cgu-content.component';

@Component({
  selector: 'app-modal-cgu',
  templateUrl: './modal-cgu.component.html',
  styleUrls: ['./modal-cgu.component.scss']
})
export class ModalCguComponent {

  constructor(public dialog: MatDialog) {}

  openCguModal(): void {
    const dialogRef = this.dialog.open(ModalCguContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Formulaire fermé.`);
    });
  }
}
