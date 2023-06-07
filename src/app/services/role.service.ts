import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeUsager } from 'src/models/typeUsager';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  public getRoles(): Observable<TypeUsager[]> {
    return this.http.get<TypeUsager[]>("http://localhost:8080/TypeUsagers")
  }
}
