import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  Url = 'http://localhost:50/inventario/';

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

}
