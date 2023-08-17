import { Entreprise } from "./Entreprise";

export interface Embauche {
    id? : number;
    dateDebut : string;
    dateFin:string;
    entreprise : Entreprise | null;
    isEdit? : boolean;
    isDelete? : boolean;
}