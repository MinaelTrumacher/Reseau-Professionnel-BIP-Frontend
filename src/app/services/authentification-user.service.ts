import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //utilisation du service de requete HTTP
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationUserService {
  //Déclaration variables
  readonly ENDPOINT_AUTHENTICATION = 'http://localhost:8080/api/authentification/login';
  readonly ENCRYPTION = true;                                                             //Activation/desaction de l'encryption

  constructor(private http: HttpClient,
              private encryptservice: EncryptionService) {}

//Fonction de renvoie du login & mdp vers API - méthode POST
login(credentials: { username: string, password: string }): Observable<any> {
    //Déclation de constante
    var ENCODEDDATA = '';

    if(this.ENCRYPTION){
      var PASSWORDENCRYPTED = this.encryptservice.encryption(credentials.password);       //encryption AES
      ENCODEDDATA = 'Basic ' + btoa(credentials.username + ':' + PASSWORDENCRYPTED);      //encodage base 64
    }else{
      ENCODEDDATA = 'Basic ' + btoa(credentials.username + ':' + credentials.password);  //encodage base 64
    }
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': ENCODEDDATA
                            }),
                            responseType: 'json' as 'json'
                          };

    console.log("Envoie des données du formulaire d'authentification vers API Back: ------->",HEADEROPTIONS);
    console.log("Certificat encrypté",ENCODEDDATA);
    return this.http.post(this.ENDPOINT_AUTHENTICATION, {}, HEADEROPTIONS );
  }
}
