import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient,private utilisateurService : UtilisateurService) { }

  getPublicationWithFiltre(filtre: any): Observable<any> {
    const ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    const url = environment.url + `/publications/search`;
    return this.http.post<any>(url, filtre, HEADEROPTIONS);
  }
}