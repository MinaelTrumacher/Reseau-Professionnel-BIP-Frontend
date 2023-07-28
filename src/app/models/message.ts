export class Message {
  id!: number;
  vu!: boolean;
  destination_id!: number;
  expediteur_id!: number;
  nomExpediteur!: string;
  nomDestination!: string;
  supprimerParUserId!: number;
  contenu!: string;
  dateEnvoi!: Date;

  constructor(
    destination_id: number,
    expediteur_id: number,
    vu: boolean = false,
    nomExpediteur: string ='',
    nomDestination: string='',
    contenu: string ='',
    dateEnvoi: Date = new Date()
  ) {
    this.vu = vu;
    this.destination_id = destination_id;
    this.expediteur_id = expediteur_id;
    this.nomExpediteur = nomExpediteur;
    this.nomDestination = nomDestination;
    this.contenu = contenu;
    this.dateEnvoi = dateEnvoi;
  }
}

export class UtilisateurDtoMessage{
  id!: number;
  nomDestination!: string;
  contenu!: string;
}
