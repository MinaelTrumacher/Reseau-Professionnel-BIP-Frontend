import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from './utilisateur.service';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  private isLoggedInSubscription: Subscription | null = null;

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  canActivate(): boolean {
    const logged = this.utilisateurService.userSession.token === null ? false : true;
    if (logged) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}