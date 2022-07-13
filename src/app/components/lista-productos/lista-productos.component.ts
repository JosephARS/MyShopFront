import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { CarritoComprasService } from 'src/app/services/components/carrito-compras.service';
import { InventarioService } from 'src/app/services/http/inventario.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  arrProductos: Producto[] = [];
  comprados: Producto[] = [];
  total: number = 0;
  procesando = false;
 // stockDisponible = true;

  constructor(private carritoComprasService:CarritoComprasService,
    private inventarioService:InventarioService,
    private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {

    this.inventarioService.getProductList().subscribe(data => {

      if (data.tipoRespuesta == 'Exito') {
        this.arrProductos = data.listaResultado;
        console.log(data);
      }else{
        this.abrirSnackBar(data.mensaje);
      }
      this.procesando = false;

    })

  }

  onClickAgregar(producto: Producto){
    console.log(producto);
    let mensaje = this.carritoComprasService.agregarProducto(producto);
    this.comprados = this.carritoComprasService.arrProductosSeleccionados;
    this.total = this.carritoComprasService.calcularTotal();
    this.abrirSnackBar(mensaje);
    console.log(this.comprados)
    console.log(this.total)
  }

  public abrirSnackBar(mensaje:string) {
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    config.verticalPosition = "top";
    config.panelClass = ['blue-snackbar'];

    this.snackBar.open(mensaje, 'Ocultar', config);
  }

}
