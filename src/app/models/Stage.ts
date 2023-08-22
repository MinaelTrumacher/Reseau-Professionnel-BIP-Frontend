import { Entreprise } from "./Entreprise";
import { Formation } from "./Formation";

export interface Stage {
    id? : number;
    type : string; 
    dateDebut : Date | null;
    dateFin : Date | null;
    entreprise : Entreprise;
    formation : Formation;   
    isEdit? : boolean;
    isDelete? : boolean;
    isCreate? : boolean;
}
