import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'stock', 'valor'];
  dataSource = new MatTableDataSource<any>();
  procesando = false;
  arrProductos: Producto[] = [];

  constructor() { }

  ngOnInit(): void {
    this.arrProductos = [
      new Producto(1,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales"),
      new Producto(2,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),
      new Producto(3,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales, fiestas y ceremonias"),
      new Producto(4,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),
      new Producto(5,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales"),
      new Producto(6,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),

    ]

    this.dataSource = new MatTableDataSource<Producto>(this.arrProductos);

  }

  onProductoSeleccionado(producto: Producto, index: number){

  }

}
