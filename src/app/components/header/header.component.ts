import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarritoComprasService } from 'src/app/services/components/carrito-compras.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cantidadArticulos: Number = 0;
  badgeOculto: BooleanInput = true;



  constructor(private router: Router,
    private carritoComprasService:CarritoComprasService) { }

  ngOnInit(): void {
    this.cantidadArticulos = this.carritoComprasService.totalArticulos;
    this.carritoComprasService.articulos.subscribe( value => {
      this.cantidadArticulos = value;
    })
  }

  ngOnDestroy(): void {
  //  this.carritoComprasService.articulos.unsubscribe();
  }

  onClickCarrito(){
    this.router.navigate(['shopping']);
    console.log("Prueba")
  }
  onClickHome(){
    this.router.navigate(['home']);
  }
  onClickInventario(){
    this.router.navigate(['inventario']);
  }
  onClickVentas(){
    this.router.navigate(['ventas']);
  }


}
