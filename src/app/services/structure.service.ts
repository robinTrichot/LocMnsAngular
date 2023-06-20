import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Structure } from 'src/models/structure';

@Injectable({
  providedIn: 'root',
})
export class StructureService {
  constructor(private http: HttpClient) {}

  public getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(
      environment.serverUrl + '/user/structures'
    );
  }
}
