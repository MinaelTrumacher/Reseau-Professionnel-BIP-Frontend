export interface Utilisateur {
  nom: string;
  prenom: string;
  role: string;
  email: string;
  mdp: string;
  description: string;
  entreprise: {
    siren: string;
    raisonSociale: string;
  };
  geolocalisation: {
    id: string;  
  };
}
