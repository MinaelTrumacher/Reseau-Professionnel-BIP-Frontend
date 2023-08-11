import { Entreprise } from "./Entreprise";
import { Formation } from "./Formation";

export interface Stage {
    id : number;
    type : string; 
    dateDebut : string;
    dateFin : string;
    entreprise : Entreprise;
    formation : Formation;
}
