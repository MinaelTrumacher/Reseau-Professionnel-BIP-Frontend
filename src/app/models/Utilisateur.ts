import { Embauche } from "./Embauche";
import { Geolocalisation } from "./Geolocalisation";
import { Stage } from "./Stage";

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  role: string;
  urlBanniere? : string;
  urlPhoto? :string;
  email: string;
  mdp: string;
  description: string;
  etatInscription : string;
  geolocalisation: Geolocalisation;
  embauches? : Embauche[];
  stages? : Stage[];
  suivis? : any[];
  date_creation? : Date
  date_inscription?: Date;
}
