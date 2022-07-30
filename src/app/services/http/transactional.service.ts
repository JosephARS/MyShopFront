import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnularPago } from 'src/app/models/anularPago';
import { PagoRequest } from 'src/app/models/pagoRequest';

@Injectable({
  providedIn: 'root'
})
export class TransactionalService {

  constructor(private http: HttpClient) { }

 // Url = 'http://localhost:51/transactional/';
  Url = 'http://localhost:8000/transactional/';



  postValidarPago(pagoRequest: PagoRequest, withToken: boolean){
    let params = new HttpParams();
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('Access-Control-Allow-Methods', '*')
    .set("Access-Control-Allow-Origin", "*");
    params = params.append('withToken',withToken);
    return this.http.post<any>(this.Url + 'payment', pagoRequest, { 'params': params} )
  }

  postAnularPago(anulacion: AnularPago){
    return this.http.post<any>(this.Url + 'refund', anulacion)
  }
}
