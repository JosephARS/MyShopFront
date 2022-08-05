import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
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
    console.log("intento")
    return this.http.post<any>(this.Url + 'payment', pagoRequest, { 'params': params} ).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  postAnularPago(anulacion: AnularPago){
    return this.http.post<any>(this.Url + 'refund', anulacion)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
