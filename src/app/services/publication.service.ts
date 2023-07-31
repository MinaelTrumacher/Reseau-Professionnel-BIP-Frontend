import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { environment } from '../../environments/environment';
import { Publication } from '../models/Publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl = 'http://localhost:8080/api';

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
  
  public getAllPublications(): Observable<Publication[]> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    console.log(this.getAllPublications)
    return this.http.get<Publication[]>(`${this.baseUrl}/publications`, HEADEROPTIONS);
  }

  public getPublicationsList(id: number): Observable<Publication[]> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.get<Publication[]>(`${this.baseUrl}/publications/${id}`, HEADEROPTIONS);
  }

  public addPublication (publication : Publication) : Observable<Publication>{
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
                        console.log(publication)
    return this.http.post<Publication>(`${this.baseUrl}/publications`, publication, HEADEROPTIONS);
  }

  public updatePublication(publication : Publication, id : number) : Observable<Publication>{
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.put<Publication>(`${this.baseUrl}/${id}`, publication, HEADEROPTIONS)
  }

  public deletePublication(id: number, publication: Publication): Observable<void> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.delete<void>(`${this.baseUrl}/${id}`, HEADEROPTIONS);
  }
  
}