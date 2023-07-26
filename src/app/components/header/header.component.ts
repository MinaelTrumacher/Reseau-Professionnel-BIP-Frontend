import { Component, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import { InscriptionComponent } from '../inscription/inscription.component';
import { MatDialog } from '@angular/material/dialog';
import { FormloginComponent } from '../form-login/form-login.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) menu!: MatMenuPanel<any>;
  @ViewChild('logoElement', { static:true }) logoElement!: ElementRef;
  isLoggedIn = false;
  private isLoggedInSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog, public utilisateurService: UtilisateurService, private router: Router,) {}

  ngOnInit(): void {
    this.isLoggedInSubscription = this.utilisateurService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      // Vous pouvez effectuer des actions supplémentaires en fonction de l'état de connexion ici
      if (isLoggedIn) {
        this.router.navigate(['/home']);
        this.logoElement.nativeElement.addEventListener('click', () => {
          console.log('Logo cliqué');
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe(); // Supprimer la souscription
    }
  }

  openFormRegister() {
    console.log('Open InscriptionComponent');
    this.dialog.open(InscriptionComponent);
  }

  openFormLogin() {
    console.log('Open FormloginComponent');
    this.dialog.open(FormloginComponent);
  }

  //Nettoyage token et Id user
  logoutRequest() {
    this.utilisateurService.cleanUserLogged();
    this.utilisateurService.updateIsLoggedInStatus(false); // Mettre à jour l'état de connexion
    this.router.navigate([""]);            //Reroutage vers homecomponent
  }
}
