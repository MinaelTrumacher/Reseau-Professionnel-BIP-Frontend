import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  utilisateur! : Utilisateur;
  ngOnInit(){
    this.utilisateur = this.dialogData.utilisateur;
  }
}
