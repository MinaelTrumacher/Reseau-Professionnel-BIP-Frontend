import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Embauche } from 'src/app/models/Embauche';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}
  utilisateur! : Utilisateur;
  embauches! : Embauche[];

  displayedColumns: string[] = ['entreprise','dateDebut','dateFin','isEdit','isDelete'];
  columnsSchema = [
    {
        key: "entreprise",
        type: "text",
        label: "Entreprise"
    },
    {
        key: "dateDebut",
        type: "date",
        label: "Date de debut"
    },
    {
      key: "dateFin",
      type: "date",
      label: "Date de fin"
    },
    {
      key: "isEdit",
      type: "isEdit",
      label: ""
    },
    {
      key: "isDelete",
      type: "isDelete",
      label: ""
    }
  ]
  
  
  ngOnInit(){
    this.utilisateur = this.dialogData.utilisateur;
    this.embauches = this.dialogData.utilisateur.embauches;
    this.embauches.forEach((element : any) => {
      element.isEdit = false;
      element.isDelete = false;
    });;
    console.log(this.embauches)
  }

  addEmbauche() {
    const newRow : Embauche = {"dateDebut": "", "dateFin": "", "entreprise": {"id":0,"raisonSociale" : '', "siret" : 0}, isEdit: true, isDelete: false}
    this.embauches = [...this.embauches, newRow];
  }

  createEmbauche(){
    console.log("create")
   }

   editEmbauche( id : BigInt){
    console.log("edit " + id)
   }

   deleteEmbauche(id : BigInt){
    console.log("delete : " + id);
   }

}
