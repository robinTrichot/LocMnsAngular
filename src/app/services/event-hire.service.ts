import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventHire } from 'src/models/eventHire';

@Injectable({
  providedIn: 'root',
})
export class EventHireService {
  constructor(private http: HttpClient) {}

  public getEventHires(): Observable<EventHire[]> {
    return this.http.get<EventHire[]>(
      environment.serverUrl + '/user/EventHire'
    );
  }
}
