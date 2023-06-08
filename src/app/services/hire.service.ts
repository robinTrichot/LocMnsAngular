import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hire } from 'src/models/hire';

@Injectable({
  providedIn: 'root'
})
export class HireService {

  constructor(private http: HttpClient) { }

  public passerCommande(hire: Hire): Observable<any> {
    return this.http.post('http://localhost:8080/commande', hire);
  }

  public getHireByUser(idUser: number): Observable<any> {
    return this.http.get('http://localhost:8080/HireUser/' + idUser);
  }

  public getHires(): Observable<Hire[]> {
    return this.http.get<Hire[]>("http://localhost:8080/admin/hires")
  }

  public validateHire(hire: Hire): Observable<any> {
    console.log("bien rentré coté front ");
    return this.http.post("http://localhost:8080/admin/validate/hire", hire);
  }

}
