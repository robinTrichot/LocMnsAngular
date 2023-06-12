import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Copy } from 'src/models/copy';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  public _copy: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  public getCopies(): Observable<Copy[]> {
    return this.http.get<Copy[]>("http://localhost:8080/user/copies")
  }

  public getCopie(id: number): Observable<Copy> {
    return this.http.get<Copy>("http://localhost:8080/user/copie/" + id)
  }

  public changeStatusCopy(copy: Copy): Observable<any> {
    return this.http.post("http://localhost:8080/user/change/copy", copy);
  }

}
