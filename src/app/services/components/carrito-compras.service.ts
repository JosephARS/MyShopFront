import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
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

  constructor(private snackBar: MatSnackBar, ) { }

  agregarProducto(producto:Producto): string{

    let prodEncontrado = this.arrProductosSeleccionados.find(item => item.idInventario === producto.idInventario);
console.log(prodEncontrado?.cantidadCompra! > prodEncontrado?.stock! );
    if(prodEncontrado){
      if(prodEncontrado.cantidadCompra+1 <= prodEncontrado.stock){
        prodEncontrado.cantidadCompra ++;
        return "Producto agregado al carrito";
      }else{
        return "No puedes agregar más unidades de esta referencia.";
      }
    }else{
      producto.cantidadCompra = 1;
      this.arrProductosSeleccionados.push(producto);
      return "Producto agregado al carrito";
    }

  }

  borrarProducto(producto:Producto){
    const prodEncontrado = this.arrProductosSeleccionados.find(item => item.idInventario === producto.idInventario)

    this.arrProductosSeleccionados = this.arrProductosSeleccionados.filter(item => item.idInventario !== producto.idInventario)
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

  public abrirSnackBar(mensaje:string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = "top";
    config.panelClass = ['blue-snackbar'];

    this.snackBar.open(mensaje, 'Ocultar', config);
  }

}
