import { Formation } from "./Formation";

export interface Session {
    id : number;
    centre : string; 
    nomPromo : string;
    dateDebut : string;
    dateFin : string;
    formation : Formation
}