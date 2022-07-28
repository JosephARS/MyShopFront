import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmarVentaRequest } from 'src/app/models/confirmarVentaRequest';
import { Venta } from 'src/app/models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:52/ventas/';


  postConfirmarVenta(ventaRequest: ConfirmarVentaRequest,idToken?:any, maskedCardNumber?:any, franquicia?:any){
    let params = new HttpParams();
    if (idToken != null) {
      params = params.append('idToken',idToken);
      params = params.append('maskedCardNumber',maskedCardNumber);
      params = params.append('franquicia',franquicia);
    }
    return this.http.post<any>(this.Url, ventaRequest,{params: params} )
  }

  getVentasList(){
    return this.http.get<any>(this.Url)
  }

  postConfirmarAnulacion(venta: Venta){
    return this.http.post<any>(this.Url + 'refund/', venta);
  }

  getUsuarioInfo(email: string){
    return this.http.get<any>(this.Url + 'usuario/' + email)
  }

}
