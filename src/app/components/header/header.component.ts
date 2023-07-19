import { Component } from '@angular/core';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';
import { FormloginComponent } from '../form-login/form-login.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog, private utilisateurService: UtilisateurService, private router: Router,) {}

  openFormRegister() {
    this.dialog.open(InscriptionComponent);
  }

  openFormLogin() {
    this.dialog.open(FormloginComponent);
  }

  //Nettoyage token et Id user
  logoutRequest() {
    this.utilisateurService.cleanUserLogged();
    this.router.navigate([""]);               //Reroutage vers homecomponent
  }

}
