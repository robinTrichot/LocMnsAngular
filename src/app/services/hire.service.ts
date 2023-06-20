import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hire } from 'src/models/hire';

@Injectable({
  providedIn: 'root',
})
export class HireService {
  constructor(private http: HttpClient) {}

  public passerCommande(hire: Hire): Observable<any> {
    return this.http.post(environment.serverUrl + '/user/commande', hire);
  }

  public getHireByUser(idUser: number): Observable<any> {
    return this.http.get(environment.serverUrl + '/user/HireUser/' + idUser);
  }

  public getHires(): Observable<Hire[]> {
    return this.http.get<Hire[]>(environment.serverUrl + '/admin/hires');
  }

  public validateHire(hire: Hire): Observable<any> {
    console.log('bien rentré coté front ');
    return this.http.post(environment.serverUrl + '/admin/validate/hire', hire);
  }
}
