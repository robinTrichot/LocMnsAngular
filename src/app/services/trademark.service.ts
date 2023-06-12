import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrademarkMaterial } from 'src/models/trademarkMaterial';

@Injectable({
  providedIn: 'root'
})
export class TrademarkService {

  constructor(private http: HttpClient) { }

  public getTrademarks(): Observable<TrademarkMaterial[]> {
    return this.http.get<TrademarkMaterial[]>("http://localhost:8080/user/trademarksMaterial")
  }
}

