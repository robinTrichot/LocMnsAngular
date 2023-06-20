import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrademarkMaterial } from 'src/models/trademarkMaterial';

@Injectable({
  providedIn: 'root'
})
export class TrademarkService {

  constructor(private http: HttpClient) { }

  public getTrademarks(): Observable<TrademarkMaterial[]> {
    return this.http.get<TrademarkMaterial[]>(environment.serverUrl + '/user/trademarksMaterial')
  }
}

