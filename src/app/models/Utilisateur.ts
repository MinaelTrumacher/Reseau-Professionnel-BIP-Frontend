import { Embauche } from "./Embauche";
import { Geolocalisation } from "./Geolocalisation";
import { Stage } from "./Stage";
import { Suivi } from "./Suivi";

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
  suivis? : Suivi[];
  date_creation? : Date
  date_inscription?: Date;
}
