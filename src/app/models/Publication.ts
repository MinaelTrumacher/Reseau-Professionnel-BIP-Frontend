import { Interaction } from "./Interaction";

export interface Publication {
    id?:number,
    title: string;
    categorie: string;
    contenu: string;
    geolocalisation : {id:string};
    utilisateur : {  id: number|null ;
      nom?: string;
      prenom?: string;
      role?: string;
      urlBanniere? : string;
      urlPhoto? :string;
      email?: string;
      mdp?: string;
      description?: string;
      etatInscription? : string;
      geolocalisation?: {
        id?: string; 
        ville? : string;
        region? : string;
        latitude? : string;
        longitude? : string;
      };
      date_creation? : Date
      date_inscription?: Date;
    }; 
    interactions? :Interaction[];
   }