import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur_Inscription';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  //Declaration varaible et constante
  private BASEURL = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private encryptservice: EncryptionService) { }


  //Fonctions pour inscription
    getVilleByCodePostal(codePostal: string): Observable<any> {
      const URL = `${this.BASEURL}/geolocalisations/codes-postaux/${codePostal}`;
      return this.http.get<any>(URL);
    }

    getEntrepriseBySiren(siren : string){
      const endpoint = "https://api.insee.fr/entreprises/sirene/V3/siren/";
      const filter = "?date=2022-01-01&champs=denominationUniteLegale%2C%20siren";
      const token = "6975ba9d-5424-3644-9378-5cf27640b58b";
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      return this.http.get(endpoint + siren + filter, { headers });
    }

  //Fonctions pour CRUD user
    createUtilisateur(utilisateur: Utilisateur): Observable<any> {
      console.log(utilisateur);
      utilisateur.mdp = this.encryptservice.encryption(utilisateur.mdp);
      console.log(utilisateur.mdp);
      const url = `${this.BASEURL}/api/authentification/register`;
      return this.http.post(url, utilisateur);
    }

    public utilisateursList() : Observable<Utilisateur[]>{
      return this.http.get<Utilisateur[]>(this.BASEURL);
    }

    public getUtilisateur(id : number) : Observable<Utilisateur>{
      return this.http.get<Utilisateur>(`${this.BASEURL}/${id}`);
    }

    public updateUtilisateur(utilisateur : Utilisateur, id : number) : Observable<Utilisateur>{
      return this.http.put<Utilisateur>(`${this.BASEURL}/${id}`, utilisateur)
    }

    public deleteUtilisateur(id: number, utilisateur: Utilisateur): Observable<void> {
      return this.http.delete<void>(`${this.BASEURL}/${id}`);
    }

  //Fonctions de connexion
     //Variable de stockage id et token de l'utilisateur après connexion
    userSession : { userId: number|null, token: string|null} = { userId: null, token: null};

    //Methode Mise à jour Variable UserSession
    setUserLogged(Response : {userId: number|null, token: string|null}) {
      this.userSession = Response;
    }

    //Methode de nettoyage de la variable UserSession
    cleanUserLogged() {
      this.userSession = {userId: null, token: null};
    }
}
