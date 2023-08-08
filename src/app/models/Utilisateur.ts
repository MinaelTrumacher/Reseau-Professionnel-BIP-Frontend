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
  geolocalisation: {
    id: string; 
    ville? : string;
    region? : string;
    latitude? : string;
    longitude? : string;
    codePostal? : string;
  };
  embauches? : any[];
  stages? : any[];
  date_creation? : Date
  date_inscription?: Date;
}
