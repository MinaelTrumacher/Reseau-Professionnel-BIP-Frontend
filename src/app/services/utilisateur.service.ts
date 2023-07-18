import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur_Inscription';
import { Observable } from 'rxjs';

export interface Utilisateurs {
  id: number;
  nom: string;
  prenom: string;
  role: string;
  email: string;
  mdp: string;
  geolocalisation: {
    id :number;
    ville : string;
    region : string;
    latitude : string;
    longitude : string;
  }
  description : string;
  etat_inscription :string;
  date_creation : Date
  date_inscription: Date;
  
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {


  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  AjouterUtilisateur(utilisateur: Utilisateur): Observable<any> {
    const url = `${this.baseUrl}/api/authentification/register`; 
    return this.http.post(url, utilisateur);
  }

  getVilleByCodePostal(codePostal: string): Observable<any> {
    const url = `http://localhost:8080/geolocalisation/${codePostal}`;
    return this.http.get<any>(url);
  }

  public utilisateursList() : Observable<Utilisateurs[]>{
    return this.http.get<Utilisateurs[]>(this.baseUrl);
  }

  public getUtilisateur(id : number) : Observable<Utilisateurs>{
    return this.http.get<Utilisateurs>(`${this.baseUrl}/${id}`);
  }

  public createUtilisateur (utilisateur : Utilisateurs) : Observable<Utilisateurs>{
    return this.http.post<Utilisateurs>(this.baseUrl, utilisateur);
  }

  public updateUtilisateur(utilisateur : Utilisateurs, id : number) : Observable<Utilisateurs>{
    return this.http.put<Utilisateurs>(`${this.baseUrl}/${id}`, utilisateur)
  }

  public deleteUtilisateur(id: number, utilisateur: Utilisateurs): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
}
