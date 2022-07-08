import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CarritoComprasService } from 'src/app/services/components/carrito-compras.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss']
})
export class CarritoComprasComponent implements OnInit, OnDestroy {

  listaArticulosCarrito: Producto[] = [];
  totalValor: number = 0;
  totalArticulos: number = 0;

  constructor(private router: Router,
              private carritoComprasService:CarritoComprasService) { }


  ngOnInit(): void {

    this.carritoComprasService.articulos.subscribe( value => {
      this.totalArticulos = value;
    });
    this.carritoComprasService.total.subscribe( value => {
      this.totalValor = value;
    });

    this.listaArticulosCarrito = this.carritoComprasService.arrProductosSeleccionados;
    this.totalValor = this.carritoComprasService.totalValor;
    this.totalArticulos = this.carritoComprasService.totalArticulos;
  }

  ngOnDestroy(): void {

  }

  onClickVolverTienda(){
    this.router.navigate(['home']);
  }

  onClickEliminar(producto: Producto){
    this.carritoComprasService.borrarProducto(producto);
    this.listaArticulosCarrito = this.carritoComprasService.arrProductosSeleccionados;
  }

}
