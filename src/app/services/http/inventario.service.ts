import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:8000/inventario/';
 // Url = 'http://localhost:50/inventario/';


   headers = new HttpHeaders()
  .append('Access-Control-Allow-Methods', '*')
  .append("Access-Control-Allow-Origin", 'http://localhost:4200');

  getProductList(){
    return this.http.get<any>(this.Url);
  }

  getProductById(idInventario: number){
    return this.http.get<any>(this.Url + idInventario);
  }

  postCreateProduct(producto: Producto){
    return this.http.post<any>(this.Url, producto)
  }

  putUpdateProduct(producto: Producto){
    return this.http.put<any>(this.Url, producto)
  }

  deleteProduct(idInventario: number){
    return this.http.delete<any>(this.Url + idInventario)
  }

  putUpdateStock(productoLista: Producto[], accion:String){
    return this.http.put<any>(this.Url + 'stock/' + accion, productoLista)
  }

}
