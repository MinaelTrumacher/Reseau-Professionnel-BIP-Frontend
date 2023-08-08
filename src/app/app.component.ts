import { Component, ChangeDetectorRef  } from '@angular/core';
import { AuthenticationUserService } from './services/authentification-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Reseau Afpa';

  windowScrolled = false;

  constructor(private authService: AuthenticationUserService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.scrollY !== 0;
    });
  }

  ngAfterViewInit(){
    //Verifie si l'utilisateur est deja connecté à l'actualisation
    //Se fait après l'initialisation des composents pour bien initialisé la variable isLoggedIn
    this.authService.checkLoggedInStatus();
    //Evite l'erreur "Expression has changed after it was checked."
    this.cdr.detectChanges();
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}
