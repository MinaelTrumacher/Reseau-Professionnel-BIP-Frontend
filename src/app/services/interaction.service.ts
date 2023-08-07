import { Injectable } from '@angular/core';
import { Interaction } from '../models/Interaction';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})

export class InteractionService {
  url = environment.url+'/interactions';

  constructor(private http: HttpClient, private utilisateurService : UtilisateurService) { }


  public getAllInteraction(): Observable<Interaction[]> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.get<Interaction[]>(this.url, HEADEROPTIONS);
  }

  public checkInteraction(publicationId: number, action: string): Observable<boolean> {
    var ENCODEDATA = 'Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                          }),
                          responseType: 'json' as 'json'
                        };
    const checkUrl = `${this.url}/${publicationId}/check/${action}`;
  
    return this.http.get<boolean>(checkUrl, HEADEROPTIONS);
  }
  
  public createInteraction (interaction : Interaction) : Observable<Interaction>{
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
                        console.log(interaction)
    return this.http.post<Interaction>(this.url ,  interaction, HEADEROPTIONS);
  }

  public deleteInteraction(id: number): Observable<void> {
    var ENCODEDATA = ' Bearer ' + this.utilisateurService.userSession.token;
    var HEADEROPTIONS = { headers: new HttpHeaders({
                            'Content-Type' : 'application/json',
                            'Authorization' : ENCODEDATA
                            }),
                          responseType: 'json' as 'json'
                        };
    return this.http.delete<void>(this.url +'/'+ id, HEADEROPTIONS);
  }
}
