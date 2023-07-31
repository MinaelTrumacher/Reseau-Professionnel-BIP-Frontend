import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgottenPwdService } from 'src/app/services/forgotten-pwd.service';
import { MatDialog } from '@angular/material/dialog'
import { matchValues } from 'src/app/functions/matchTo';


@Component({
  selector: 'app-form-pwd',
  templateUrl: './form-pwd.component.html',
  styleUrls: ['./form-pwd.component.scss']
})

export class FormPwdComponent {
  //Instanciation et Declaration de variable
  renewMdpForm1!: FormGroup;                        //objet             - stockage des données du formulaire n°1
  renewMdpForm2!: FormGroup;                        //objet             - stockage des données du formulaire n°2
  hide = true;                                      //hide              - cacher mot de passe
  isvalidatedEmail = false;                         //isvalidatedEmail  - email validé
  ischangedPwd = false;                             //ischangedPwd      - mot de passe modifié
  error_404 = false;                                //error_404         - utilisateur Non présent en BDD
  error_400_PINcode = false;                        //error_400_Pincode - code non trouvé
  error_400_expired = false;                        //error_400_expired - code expiré
  error_others = false;                             //error_others      - problème envoie email ou autres
  timerForm2closed = 5000;

  constructor(private formBuilder: FormBuilder,
              private forgottenPwdService: ForgottenPwdService,
              private dialog: MatDialog,
             ) {}

  ngOnInit(): void {
    //Vérification des formulaires
    this.renewMdpForm1 = this.formBuilder.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(50),
        ]),
      });
    this.renewMdpForm2 = this.formBuilder.group({
        PINcode: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(6),
          Validators.maxLength(7),
        ]),
        mdp: new FormControl('', [
          Validators.required,
          Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+{};:,<.>]).*'),
          Validators.minLength(8),
          Validators.maxLength(50),
        ]),
        mdp2: new FormControl('', [
          Validators.required,
          matchValues('mdp'),
        ])
      });
  }

  //Fonction d'envoie de vérification d'email - etape 1
  sendEmail() {
    if (this.renewMdpForm1.valid) {
      const myEmail = this.renewMdpForm1.value.email;
      console.log("Formulaire n°1 Récupération du mdp - email:", myEmail);
      this.forgottenPwdService.sendValEmail(myEmail).subscribe({
        next: (HttpResponse) => {
          this.error_404 = false;
          this.error_others = false;
          console.log("Réponse API back: Email found <-------", HttpResponse);
          this.isvalidatedEmail = true;
        },
        error: (HttpErrorResponse) => {
          this.error_404 = false;
          this.error_others = false;
          console.log("Message d'erreur API back: <-------", HttpErrorResponse);
          if ( HttpErrorResponse.status == 404 && HttpErrorResponse.error.error == "Utilisateur introuvable") {
            console.log("error_404",HttpErrorResponse.error.error);
            this.error_404 = true;
          }
          else {
            console.log("service indisponible",HttpErrorResponse.error.error);
            this.error_others = true;
          }
        }
      });
    }
  }

  //Fonction d'envoie d'une demande de renouvellement du mot de passe - etape 2
  renewPwd(){
    if(this.renewMdpForm2.valid){
      var myData = { email: this.renewMdpForm1.value.email, code: this.renewMdpForm2.value.PINcode, password: this.renewMdpForm2.value.mdp };

      console.log("Formulaire n°2 de Récupération du mdp - email, PINcode, mdp:", myData);
      this.forgottenPwdService.renewValPwd(myData).subscribe({
        next: (HttpResponse) => {
          //Validation côté Back : Message d'information + fermeture de la modal après 5s
          console.log("Réponse API back: Password renewed <-------", HttpResponse);
          this.error_400_PINcode = false;
          this.error_400_expired = false;
          this.ischangedPwd = true;
          setTimeout(() => {    this.closeFormRenewPwd();
                            },  this.timerForm2closed );
        },
        error: (HttpErrorResponse) => {
          //Affichage de message d'erreur en fonction de l'erreur reçu
          console.log("Message d'erreur API back: <-------", HttpErrorResponse);
          if ( HttpErrorResponse.status == 400 && HttpErrorResponse.error == "Code non trouvé") {
            console.log("error_400", HttpErrorResponse.error);
            this.error_400_expired = false;
            this.error_400_PINcode = true;
          }
          if ( HttpErrorResponse.status == 400 && HttpErrorResponse.error == "Code expired") {
            console.log("error_400", HttpErrorResponse.error);
            this.error_400_PINcode = false;
            this.error_400_expired = true;
          }
        }
      });
    }
  }

  closeFormRenewPwd() {
    this.dialog.closeAll();
  }
}
