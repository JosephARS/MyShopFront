import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { InventarioService } from 'src/app/services/http/inventario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['imgUrl', 'idInventario', 'nombre', 'descripcion', 'stock', 'valor'];
  dataSource = new MatTableDataSource<any>();
  procesando = false;
  arrProductos: Producto[] = [];

  constructor(    private inventarioService:InventarioService,
    private snackBar: MatSnackBar,
    private router: Router,) { }

  ngOnInit(): void {
    // this.arrProductos = [
    //   new Producto(1,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales"),
    //   new Producto(2,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),
    //   new Producto(3,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales, fiestas y ceremonias"),
    //   new Producto(4,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),
    //   new Producto(5,"Zapato clasico", "https://ofi5.com/wp-content/uploads/2016/03/ZAPATO-CLASICO-HOMBRE.png", 120000, "Zapata para ocasiones especiales"),
    //   new Producto(6,"Zapato deportivo", "https://st.depositphotos.com/2168411/5116/i/600/depositphotos_51162959-stock-photo-new-running-shoe-sneaker-or.jpg", 170000, "Zapata para ejercicio"),

    // ]

    this.procesando = true;
    this.inventarioService.getProductList().subscribe(data => {

      if (data.tipoRespuesta == 'Exito') {
        this.dataSource = new MatTableDataSource<Producto>(data.listaResultado);
        console.log(data);
      }else{
        this.abrirSnackBar(data.mensaje);
      }
      this.procesando = false;

    })


  }

  onProductoSeleccionado(producto: Producto, index: number){
    console.log(producto)
    this.router.navigate(['admin/producto/' + producto.idInventario]);
  }

  onClickCrearProducto(){
    this.router.navigate(['admin/producto/0']);
    console.log("ABc")
  }


  public abrirSnackBar(mensaje:string) {
    let config = new MatSnackBarConfig();
    config.duration = 6000;
    config.verticalPosition = "top";
    config.panelClass = ['blue-snackbar'];

    this.snackBar.open(mensaje, 'Ocultar', config);
  }

}
