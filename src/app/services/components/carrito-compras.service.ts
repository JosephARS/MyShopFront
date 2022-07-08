import { EventEmitter, Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  totalValor: number = 0;
  totalArticulos: number = 0;
  arrProductosSeleccionados: Producto[] = [];
  articulos = new EventEmitter<number>();
  total = new EventEmitter<number>();

  constructor() { }

  agregarProducto(producto:Producto){

    let prodEncontrado = this.arrProductosSeleccionados.find(item => item.id === producto.id);

    if(prodEncontrado){
      prodEncontrado.cantidadCompra ++;

    }else{
      producto.cantidadCompra = 1;
      this.arrProductosSeleccionados.push(producto)
    }

  }

  borrarProducto(producto:Producto){
    const prodEncontrado = this.arrProductosSeleccionados.find(item => item.id === producto.id)

    this.arrProductosSeleccionados = this.arrProductosSeleccionados.filter(item => item.id !== producto.id)
    this.calcularTotal();

  }

  calcularTotal():number{
    this.totalValor = 0;
    this.totalArticulos = 0;
    this.arrProductosSeleccionados.forEach(element => {
      this.totalValor += element.precio * element.cantidadCompra;
      this.totalArticulos += element.cantidadCompra;
      console.log(this.totalValor);
    });
    this.articulos.emit(this.totalArticulos);
    this.total.emit(this.totalValor);
    return this.totalValor;

  }

}
