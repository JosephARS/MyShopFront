import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { CarritoComprasService } from 'src/app/services/components/carrito-compras.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {

  arrProductos: Producto[] = [];
  comprados: Producto[] = [];
  total: number = 0;

  constructor(private carritoComprasService:CarritoComprasService) { }

  ngOnInit(): void {

    this.arrProductos = [
      new Producto(1,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales"),
      new Producto(2,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),
      new Producto(3,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales, fiestas y ceremonias"),
      new Producto(4,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),
      new Producto(5,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales"),
      new Producto(6,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),

    ]



  }

  onClickAgregar(producto: Producto){
    console.log(producto);
    this.carritoComprasService.agregarProducto(producto);
    this.comprados = this.carritoComprasService.arrProductosSeleccionados;
    this.total = this.carritoComprasService.calcularTotal();
    console.log(this.comprados)
    console.log(this.total)
  }

}
