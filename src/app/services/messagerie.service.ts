import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message, UtilisateurDestinataireMessage } from '../models/message';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { UtilisateurService } from './utilisateur.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  private readonly API_MESSAGE = "/messages";

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.utilisateurService.userSession.token
  })

  constructor(
    private http: HttpClient,
    private utilisateurService: UtilisateurService
  ) { }

  /*  permet d'emettre la valeur de l'attribue id de l'élément qui contient la conversation selectionnée */
  private SelectedConversationSubject = new Subject<string>();
  public SelectedConversationSubject$ = this.SelectedConversationSubject.asObservable();
  setSelectedConversationSubject(attributeIdOfSelectConversation: string) {
    this.SelectedConversationSubject.next(attributeIdOfSelectConversation);
  }

  async getlastMessageOfAllConversations(expediteur_id: Number): Promise<Message[]> {
    return await lastValueFrom(this.http.get<Message[]>(`${environment.url}${this.API_MESSAGE}/${expediteur_id}`, { headers: this.headers }));
  }

  async getDetailsConversationBetween2User(expediteur_id: Number, destinataire_id: Number): Promise<Message[]> {
    return await lastValueFrom(this.http.get<Message[]>(`${environment.url}${this.API_MESSAGE}/${expediteur_id}/${destinataire_id}`, { headers: this.headers }));
  }

  async sendMessage(message: Message): Promise<HttpResponse<Message>> {
    return await lastValueFrom(this.http.post<Message>(`${environment.url}${this.API_MESSAGE}`, message, { headers: this.headers, observe: "response" }));
  }

  async updateMessageConversation(messageConversation: Message): Promise<Message> {
    return await lastValueFrom(this.http.put<Message>(`${environment.url}${this.API_MESSAGE}`, { headers: this.headers, body: messageConversation }));
  }

  async deleteMessageConversation(message: Message): Promise<HttpResponse<any>> {
    return await lastValueFrom(this.http.delete(`${environment.url}${this.API_MESSAGE}/message`, { headers: this.headers, observe: "response", body: message }));
  }

  async deleteConversation(lastMessageConversation: Message, userId: number): Promise<HttpResponse<any>> {
    return await lastValueFrom(this.http.delete(`${environment.url}${this.API_MESSAGE}/conversation/${userId}`, { headers: this.headers, observe: "response", body: lastMessageConversation }));
  }

  getUsersByFirstnameOrLastname(nomOrPrenom: string): Observable<UtilisateurDestinataireMessage[]> {
    return this.http.get<UtilisateurDestinataireMessage[]>(`${environment.url}/utilisateurs/filtreBynameOrPrenom/${nomOrPrenom}`, { headers: this.headers });
  }
}
