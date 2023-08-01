import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationUserService } from 'src/app/services/authentification-user.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormPwdComponent } from '../form-pwd/form-pwd.component';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
  providers: [AuthenticationUserService],
})

export class FormLoginComponent implements OnInit {
  //Instanciation et Declaration de variable
  logForm: FormGroup;           //Objet de stockage de l'email et du mdp
  hide = true;                  //Variable pour masquer le champs password
  error_401 = false;            //Variables gestion de l'erreur 401
  error_423 = false;            //Variables gestion de l'erreur 423

  //Injection de classe dans le constructeur
  constructor(
      private formBuilder: FormBuilder,
      private authenticationUserService: AuthenticationUserService,
      private utilisateurService: UtilisateurService,
      private router: Router,
      private dialog: MatDialog
    ) {
    this.logForm = this.formBuilder.group({
      email: '',
      mdp: '',
    });
  }

  ngOnInit(): void {
    //Vérification des champs login et password
    this.logForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(50),
      ]),
      mdp: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/),
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });

    //Default value
    this.logForm.setValue({
      email: "chnaifw@gmail.com",
      mdp : "123456aB/"
    });
  }

  //Fonction de renvoi des données du formulaire et du traitement de la réponse
  loginRequest() {
    if (this.logForm.valid) {
      const FORMDATA = this.logForm.value;
      console.log("Donnée saisie dans le formulaire authentification:",FORMDATA);
      const CREDENTIALS = { username: FORMDATA.email, password: FORMDATA.mdp };
      console.log("Certificat envoyé - (json clef valeur): ------->",CREDENTIALS);
      this.authenticationUserService.login(CREDENTIALS).subscribe({
        next: (HttpResponse) => {
          console.log("Réponse back: <-------",HttpResponse);

          //Sauvegarde token et Id user
          this.utilisateurService.setUserLogged(HttpResponse);
          console.log("Sauvegarde id et token user:",this.utilisateurService.userSession);

          ////Reroutage vers page principal
          this.router.navigate(["home"]);

          //Fermeture de la modal
          this.dialog.closeAll();
        },
        error: ( HttpErrorResponse ) => {
          console.log("Error API back: <-------", HttpErrorResponse);

          if ( HttpErrorResponse.status == 401 ) {
            this.error_401 = true; //Erreur 401 - unauthorized : "mdp ou login incorrect"
            console.log("error_401",this.error_401);
          } else {
            this.error_423 = true; //Erreur 423 - Échec de la connexion : utilisateur non vérifié
            console.log("error_423",this.error_423);
          }
        },
      });
    }
  }

  closeFormLogin() {
    this.dialog.closeAll();
  }

  openPwdForgot() {
    this.dialog.closeAll();
    this.dialog.open(FormPwdComponent);
  }

}
