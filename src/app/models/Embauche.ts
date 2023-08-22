import { Entreprise } from "./Entreprise";

export interface Embauche {
    id? : number;
    dateDebut : Date | null;
    dateFin : Date | null;
    entreprise : Entreprise | null;
    isEdit? : boolean;
    isDelete? : boolean;
    isCreate? : boolean;
}