import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur_Inscription';
import { Observable, Subject } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private isLoggedInSubject = new Subject<boolean>(); // Subject pour la communication avec le header.component
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable pour mettre à jour isLoggedIn dans le header.component

  constructor(private http: HttpClient,
    private encryptservice: EncryptionService) { }


//Fonctions pour inscription
getVilleByCodePostal(codePostal: string): Observable<any> {
  return this.http.get<any>(environment.url + '/geolocalisations/codes-postaux/' + codePostal);
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
  const url = environment.url + '/authentification/register';
  return this.http.post(url, utilisateur);
}

public utilisateursList() : Observable<Utilisateur[]>{
  return this.http.get<Utilisateur[]>(environment.url); // a revoir l'endpoint
}

public getUtilisateur(id : number) : Observable<Utilisateur>{
  return this.http.get<Utilisateur>(environment.url + '/' + id); // a revoir l'endpoint
}

public updateUtilisateur(utilisateur : Utilisateur, id : number) : Observable<Utilisateur>{
  return this.http.put<Utilisateur>(environment.url + '/' + id, utilisateur) // a revoir l'endpoint
}

public deleteUtilisateur(id: number, utilisateur: Utilisateur): Observable<void> {
  return this.http.delete<void>(environment.url + '/' + id); // a revoir l'endpoint
}

//Fonctions de connexion
//Variable de stockage id et token de l'utilisateur après connexion
userSession : { userId: number|null, token: string|null} = { userId: null, token: null};

//Methode Mise à jour Variable isLoggedIn
updateIsLoggedInStatus(isLoggedIn: boolean) {
  this.isLoggedInSubject.next(isLoggedIn); // Utilisé pour la déconnexion (utile ou pas ?)
}

//Methode Mise à jour Variable UserSession
setUserLogged(Response : {userId: number|null, token: string|null}) {
  this.userSession = Response;
  this.isLoggedInSubject.next(true); // Passage de la variable isLoggedIn dans le header.component à true
}

//Methode de nettoyage de la variable UserSession
cleanUserLogged() {
  this.userSession = {userId: null, token: null};
  this.isLoggedInSubject.next(false); // Passage de la variable isLoggedIn dans le header.component à false
}

}
