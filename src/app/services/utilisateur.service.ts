import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur_Inscription';
import { Observable } from 'rxjs';
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
  
}
