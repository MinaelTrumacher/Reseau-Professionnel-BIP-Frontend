import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuardGuard implements CanActivate {

  private isLoggedInSubscription: Subscription | null = null;

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  canActivate(): boolean {
    const logged = this.utilisateurService.userSession.token === null ? false : true;
    if (logged) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
  
}
