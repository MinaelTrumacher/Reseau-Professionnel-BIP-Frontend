import { Formation } from "./Formation";

export interface Session {
    id? : number;
    centre : string; 
    nomPromo : string;
    dateDebut : Date | null;
    dateFin : Date | null;
    formation : Formation
    isEdit? : boolean;
    isDelete? : boolean;
    isCreate? : boolean;
}