import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ForgottenPwdService {

  constructor(private http: HttpClient,
              private encryptservice: EncryptionService) { }

//Fonction de renvoie de l'email pour activation mail code PIN
  sendValEmail(email: string): Observable<any> {
    console.log("Envoie vers API back : email ------->: ", email);
    return this.http.post(environment.url + '/reset/resetform?email='+email, {});
  }

//Fonction de renvoie de l'email et du mot de passe
  renewValPwd(credentials: { email: string, code: number, password: string }): Observable<any> {
    const passwordencrypted = this.encryptservice.encryption(credentials.password);
    const infosend = { email: credentials.email, code: credentials.code, password: passwordencrypted };

    console.log("Envoie vers API back : email, code, mdp : ------->", infosend);
    return this.http.post(environment.url + '/reset/change', infosend);
  }
};

