import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur';
import { Observable, Subject } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { environment } from 'src/environments/environment';
import { ChangeMdp } from '../models/ChangeMdp.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private isLoggedInSubject = new Subject<boolean>(); // Subject pour la communication avec le header.component
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable pour mettre à jour isLoggedIn dans le header.component

  constructor(private http: HttpClient,
    private encryptService: EncryptionService,
    private cookieService: CookieService,
    ) { }


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

getFormations(){
  const ENCODEDATA = ' Bearer ' + this.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    const url = environment.url + '/formations';
    return this.http.get<any>(url, HEADEROPTIONS);
}

//Fonctions pour CRUD user
createUtilisateur(utilisateur: Utilisateur): Observable<any> {
  console.log(utilisateur);
  utilisateur.mdp = this.encryptService.encryption(utilisateur.mdp);
  console.log(utilisateur.mdp);
  const url = environment.url + '/authentification/register';
  return this.http.post(url, utilisateur);
}

changePassword(changeMdp: ChangeMdp): Observable<any> {
  const url = environment.url + '/reset/updatePwd/' + this.userSession.userId;
  var ENCODEDATA = ' Bearer ' + this.userSession.token;
  var HEADEROPTIONS = { headers: new HttpHeaders({
   'Content-Type' : 'application/json',
   'Authorization' : ENCODEDATA
   }),
 responseType: 'json' as 'json'
};
  return this.http.put<void>(url, changeMdp, HEADEROPTIONS);
}

public utilisateursList() : Observable<Utilisateur[]>{
  return this.http.get<Utilisateur[]>(environment.url);
}

getUtilisateur(id : number) : Observable<Utilisateur>{
  const url = environment.url + '/utilisateurs/' + id;
  var ENCODEDATA = ' Bearer ' + this.userSession.token;
  var HEADEROPTIONS = { headers: new HttpHeaders({
   'Content-Type' : 'application/json',
   'Authorization' : ENCODEDATA
   }),
 responseType: 'json' as 'json'
};
  return this.http.get<Utilisateur>(url, HEADEROPTIONS);
}

public updateUtilisateur(utilisateur : Utilisateur, id : number) : Observable<Utilisateur>{
  const url = environment.url + '/utilisateurs/' + id;
  var ENCODEDATA = ' Bearer ' + this.userSession.token;
  var HEADEROPTIONS = { headers: new HttpHeaders({
   'Content-Type' : 'application/json',
   'Authorization' : ENCODEDATA
   }),
 responseType: 'json' as 'json'
};
  return this.http.put<Utilisateur>(url, utilisateur, HEADEROPTIONS);
}

updateUtilisateurElement(newUrlPhoto: string | null, newUrlBanniere: string | null, newDescription: string | null, id : number): Observable<any> {
  const url = environment.url + '/utilisateurs/' + id+'/modifier-infos';
  var ENCODEDATA = ' Bearer ' + this.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : ENCODEDATA
    }),
  responseType: 'json' as 'json'
  };
  const body = {
    newUrlPhoto,
    newUrlBanniere,
    newDescription
  };
  
  return this.http.put<any>(url, body, HEADEROPTIONS );
}

deleteUtilisateur(id: number, utilisateur: Utilisateur): Observable<void> {
  const url = environment.url + '/utilisateurs/' + id;
  const ENCODEDATA = `Bearer ${this.userSession.token}`;
  const HEADEROPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ENCODEDATA
    }),
    responseType: 'json' as 'json'
  };

  return this.http.delete<void>(url, HEADEROPTIONS);
}
//Fonctions de connexion
//Variable de stockage id et token de l'utilisateur après connexion
userSession : { userId: number|null, token: string|null, role: string|null} = { userId: null, token: null,role: null};

//Methode Mise à jour Variable isLoggedIn
updateIsLoggedInStatus(isLoggedIn: boolean) {
  this.isLoggedInSubject.next(isLoggedIn); // Utilisé pour la déconnexion (utile ou pas ?)
}

//Methode Mise à jour Variable UserSession
setUserLogged(Response : {userId: number|null, token: string|null, role: string|null}) {
  this.userSession = Response;
  this.isLoggedInSubject.next(true); // Passage de la variable isLoggedIn dans le header.component à true
}

//Methode de nettoyage de la variable UserSession
cleanUserLogged() {
  this.userSession = { userId: null, token: null, role: null};
  this.isLoggedInSubject.next(false); // Passage de la variable isLoggedIn dans le header.component à false

  // Supprimer tous les cookies
  this.cookieService.delete('token');
  this.cookieService.delete('userId');
  this.cookieService.delete('role');
}

}
