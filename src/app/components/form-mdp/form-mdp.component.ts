import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-mdp',
  templateUrl: './form-mdp.component.html',
  styleUrls: ['./form-mdp.component.scss']
})
export class FormMdpComponent {
  //Instanciation et Declaration de variable
  RenewForm: FormGroup;              //Objet de stockage de l'email

  constructor(private formBuilder: FormBuilder,) {
    this.RenewForm = this.formBuilder.group({
      email: '',
    });
  }

//Fonction de renouvellement du mot de passe
  RenewMdp() {

  }
}
