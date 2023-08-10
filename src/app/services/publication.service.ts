import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { environment } from 'src/environments/environment';
import { Publication } from '../models/Publication';

@Injectable({
  providedIn: 'root'
})


export class PublicationService {
   url = environment.url+'/publications';

  constructor(private http: HttpClient,private utilisateurService : UtilisateurService) { }

  getPublicationWithFiltre(filtre: any): Observable<any> {
    const ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.post<any>(this.url+'/search', filtre, HEADEROPTIONS);
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
    return this.http.get<Publication[]>(this.url, HEADEROPTIONS);
  }

  public getAllFavoris(id : number): Observable<Publication[]> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    console.log(this.getAllFavoris)
    return this.http.get<Publication[]>(this.url+'/favoris/'+id, HEADEROPTIONS);
  }

  public getPublicationsList(id: number): Observable<Publication[]> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.get<Publication[]>(this.url+'/utilisateur/'+id, HEADEROPTIONS);
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
    return this.http.post<Publication>(this.url, publication, HEADEROPTIONS);
  }

  public updatePublication(publication : Publication, id : number) : Observable<Publication>{
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.put<Publication>(this.url+'/'+id, publication, HEADEROPTIONS)
  }

  public deletePublication(id: number, publication: Publication): Observable<void> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.delete<void>(this.url + '/'+ id, HEADEROPTIONS);
  }
  
}