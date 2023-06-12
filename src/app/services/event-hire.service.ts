import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventHire } from 'src/models/eventHire';

@Injectable({
  providedIn: 'root'
})
export class EventHireService {

  constructor(private http: HttpClient) { }

  public getEventHires(): Observable<EventHire[]> {
    return this.http.get<EventHire[]>("http://localhost:8080/user/EventHire")
  }
}
