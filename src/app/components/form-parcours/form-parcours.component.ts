import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { Embauche } from 'src/app/models/Embauche';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Stage } from 'src/app/models/Stage';

import * as moment from 'moment';
import { Formation } from 'src/app/models/Formation';
import { Session } from 'src/app/models/Session';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,private utilisateurService : UtilisateurService) {}
  utilisateur! : Utilisateur;
  embauches! : Embauche[];
  stages! : Stage[];
  sessions!: Session[];
  formations!: Formation[];

  displayedColumnsEmbauche: string[] = ['entreprise','dateDebut','dateFin','isEdit','isDelete'];
  columnsSchemaEmbauche = [
    {
        key: "entreprise",
        type: "entreprise",
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
  
  displayedColumnsStage: string[] = ['type','formation','entreprise','dateDebut','dateFin','isEdit','isDelete'];
  columnsSchemaStage = [
    {
      key: "type",
      type: "type",
      label: "Type"
    },
    {
      key: "formation",
      type: "formation",
      label: "Formation"
    },
    {
      key: "entreprise",
      type: "entreprise",
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

  displayedColumnsSession: string[] = ['nomPromo','formation','centre','dateDebut','dateFin','isEdit','isDelete'];
  columnsSchemaSession = [
    {
      key: "nomPromo",
      type: "text",
      label: "Promo"
    },
    {
      key: "formation",
      type: "formation",
      label: "Formation"
    },
    {
      key: "centre",
      type: "text",
      label: "Centre"
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
  
  ngOnInit() {
    this.getFormation();
    this.utilisateur = this.dialogData.utilisateur;

    this.embauches = this.dialogData.utilisateur.embauches;
    setTimeout(() => {
      this.embauches.forEach((element: any) => {
        if (element.dateDebut) {
          element.dateDebut = moment(element.dateDebut).format('YYYY-MM-DD');
        }
        if (element.dateFin) {
          element.dateFin = moment(element.dateFin).format('YYYY-MM-DD');
        }
        element.isEdit = false;
        element.isDelete = false;
        element.isCreate = false;
      });
      console.log(this.embauches);
    });

    this.stages = this.dialogData.utilisateur.stages;
    setTimeout(() => {
      this.stages.forEach((element: any) => {
        if (element.dateDebut) {
          element.dateDebut = moment(element.dateDebut).format('YYYY-MM-DD');
        }
        if (element.dateFin) {
          element.dateFin = moment(element.dateFin).format('YYYY-MM-DD');
        }
        element.isEdit = false;
        element.isDelete = false;
        element.isCreate = false;
      });
      console.log(this.stages);
    });

    var suivis = this.dialogData.utilisateur.suivis;
    console.log("rqdskfs")
    console.log(suivis)
    setTimeout(() => {
      suivis.forEach((element: any) => {
        element = element.session;
        if (element.dateDebut) {
          element.dateDebut = moment(element.dateDebut).format('YYYY-MM-DD');
        }
        if (element.dateFin) {
          element.dateFin = moment(element.dateFin).format('YYYY-MM-DD');
        }
        element.isEdit = false;
        element.isDelete = false;
        element.isCreate = false;
      });
    });
    console.log(suivis)
    this.sessions = suivis;
    console.log("test")
    console.log(suivis);
    console.log(this.sessions);
  }

  /* METHODE EMBAUCHE */
  addEmbauche() {
    const newRow : Embauche = {"dateDebut": null, "dateFin": null, "entreprise": {"id":0,"raisonSociale" : '', "siret" : null}, isEdit: true, isDelete: false, isCreate: true}
    this.embauches = [...this.embauches, newRow];
  }

  createEmbauche(element : any){
    console.log("create")
    console.log(element)
    element.isCreate = false;
    element.isEdit = false;
   }

   editEmbauche( id : BigInt, element : any){
    console.log("edit " + id + "element : ")
    console.log(element)
    element.isEdit = false;
   }

   deleteEmbauche(id : BigInt){
    console.log("delete : " + id);
    this.embauches = this.embauches.filter((u:any) => u.id !== id);
   }

   /* METHODE STAGE */

   addStage() {
    const newRow : Stage = {"type" : '',"dateDebut": null, "dateFin": null, "entreprise": {"id":0,"raisonSociale" : '', "siret" : null}, "formation": {"id":0,"titre" : '', "codeRncp" : ''}, isEdit: true, isDelete: false, isCreate: true}
    this.stages = [...this.stages, newRow];
  }

  createStage(element : any){
    console.log("create")
    console.log(element)
    element.isCreate = false;
    element.isEdit = false;
   }

   editStage( id : BigInt, element : any){
    console.log("edit " + id + "element : ")
    console.log(element)
    element.isEdit = false;
   }

   deleteStage(id : BigInt){
    console.log("delete : " + id);
    this.stages = this.stages.filter((u:any) => u.id !== id);
   }

    /* METHODE Session */

    addSession() {
      const newRow : Session = {"nomPromo" : '',"centre" : '',"dateDebut": null, "dateFin": null, "formation": {"id":0,"titre" : '', "codeRncp" : ''}, isEdit: true, isDelete: false, isCreate: true}
      this.sessions = [...this.sessions, newRow];
    }
  
    createSession(element : any){
      console.log("create")
      console.log(element)
      element.isCreate = false;
      element.isEdit = false;
     }
  
     editSession( id : BigInt, element : any){
      console.log("edit " + id + "element : ")
      console.log(element)
      element.isEdit = false;
     }
  
     deleteSession(id : BigInt){
      console.log("delete : " + id);
      this.sessions = this.sessions.filter((u:any) => u.id !== id);
     }

   getEntrepriseBySiren(siret : string, entreprise : any){
    const regex = /^(?:\d{9}|\d{3}\s\d{3}\s\d{3})$/;
    if(regex.test(siret))
      this.utilisateurService.getEntrepriseBySiren(siret)
      .subscribe({
        next: (entreprises : any) => {
          console.log('Entreprise trouvé : ');
          console.log(entreprises.uniteLegale.periodesUniteLegale[0].denominationUniteLegale);
          entreprise.raisonSociale = entreprises.uniteLegale.periodesUniteLegale[0].denominationUniteLegale;
        },
        error: (error) => {
         console.log(error);
        }
      });;
   }

   getFormation(){
      this.utilisateurService.getFormations()
      .subscribe({
        next: (formations : any) => {
          console.log('Formation trouvé : ');
          console.log(formations);
          this.formations = formations;
        },
        error: (error) => {
         console.log(error);
        }
      });;
   }

}
