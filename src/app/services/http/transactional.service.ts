import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnularPago } from 'src/app/models/anularPago';
import { PagoRequest } from 'src/app/models/pagoRequest';

@Injectable({
  providedIn: 'root'
})
export class TransactionalService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:51/payment/';


  postValidarPago(pagoRequest: PagoRequest, withToken: boolean){
    let params = new HttpParams();
    params = params.append('withToken',withToken);
    return this.http.post<any>(this.Url, pagoRequest, {params: params} )
  }

  postAnularPago(anulacion: AnularPago){
    return this.http.post<any>(this.Url + 'refund', anulacion)
  }
}
