import { Component } from '@angular/core';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) {}

  ModalInscription() {
    this.dialog.open(InscriptionComponent);
  }

}
