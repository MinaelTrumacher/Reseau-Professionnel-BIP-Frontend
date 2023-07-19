import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ForgottenPwdService {
  //Déclaration variables
  readonly ENDPOINT_CHECK_EMAIL = 'http://localhost:8080/api/reset';
  readonly ENDPOINT_RENEW_MDP = 'http://localhost:8080/api/reset/xxxxxx';
  readonly ENCRYPTIONKEY = 'your-encryption-key';

  constructor(private http: HttpClient,
              private encryptservice: EncryptionService) { }

//Fonction de renvoie de l'email pour activation mail code PIN
  sendValEmail(email: String): Observable<any> {
    const emailForward = email;
    console.log("Contenu requête HTTP",this.http);
    return this.http.get(`${this.ENDPOINT_CHECK_EMAIL}"/"${emailForward}`);
  }

//Fonction de renvoie de l'email et du mot de passe
  renewValPwd(credentials: { email: string, codePIN: number, password: string }): Observable<any> {

    //Déclation de constante
    const passwordencrypted = this.encryptservice.encryption(credentials.password);                            //encryption AES
    const encodedData = 'Basic ' + btoa(credentials.email + credentials.codePIN + ':' + passwordencrypted);    //encodage base 64
    const headerOptions = { headers: new HttpHeaders({
                            'Content-Type': 'application/json',
                            'Authorization': encodedData
                            }),
                            responseType: 'json' as 'json'
                          };

    console.log("Envoie des données du formulaire de réinitialisation du mdp vers API Back: ------->",headerOptions);
    console.log("Certificat encrypté",encodedData);
    return this.http.post(this.ENDPOINT_RENEW_MDP, {}, headerOptions );
  }
};

