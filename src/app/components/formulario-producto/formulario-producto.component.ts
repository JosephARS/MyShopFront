import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { InventarioService } from 'src/app/services/http/inventario.service';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {

  procesando = false;

  productoForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    imgUrl:['', Validators.required],
    stock:[, Validators.required],
    precio:[, Validators.required]
  });

  oProducto: Producto = new Producto();
  ocultaEliminar = true;

  @Input()
  productoSeleccionado!: Producto;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private inventarioService:InventarioService,) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params)=>{
      console.log(params['idproducto'] === 0);
      console.log(params['idproducto'] === '0');
      if(params['idproducto'] !== undefined && params['idproducto'] !== '0'){
        this.ocultaEliminar = false;
        this.buscarDatos(params['idproducto'])
      }
    });

  }

  buscarDatos(idProducto: number){
    this.procesando = true;
    this.inventarioService.getProductById(idProducto).subscribe(data => {
      console.log(data.resultado);
      if (data.tipoRespuesta == 'Exito') {
        this.productoSeleccionado = data.resultado;
        this.productoForm.controls.nombre.setValue(data.resultado.nombre);
        this.productoForm.controls.descripcion.setValue(data.resultado.descripcion);
        this.productoForm.controls.imgUrl.setValue(data.resultado.imgUrl);
        this.productoForm.controls.stock.setValue(data.resultado.stock);
        this.productoForm.controls.precio.setValue(data.resultado.precio);
        console.log(this.productoSeleccionado);
      }else{
        this.abrirSnackBar(data.mensaje);
      }
      this.procesando = false;

    })
  }

  guardarProducto(){
    if (!this.productoForm.invalid) {
      this.procesando = true;
      this.oProducto.nombre = this.productoForm.value.nombre!;
      this.oProducto.descripcion = this.productoForm.value.descripcion;
      this.oProducto.imgUrl = this.productoForm.value.imgUrl;
      this.oProducto.stock = this.productoForm.value.stock!;
      this.oProducto.precio = this.productoForm.value.precio!;

      if (!this.productoSeleccionado) {

        this.inventarioService.postCreateProduct(this.oProducto).subscribe(data => {

          if (data.tipoRespuesta == 'Exito') {
            this.abrirSnackBar("Producto creado exitosamente.");
            console.log(data);
            this.router.navigate(['admin']);
          }else{
            this.abrirSnackBar("Error creando el producto.");
          }
          this.procesando = false;


        })
      }else{
        this.oProducto.idInventario = this.productoSeleccionado.idInventario;
        this.inventarioService.putUpdateProduct(this.oProducto).subscribe(data => {

          if (data.tipoRespuesta == 'Exito') {
            this.abrirSnackBar("Producto actualizado exitosamente.");
            console.log(data);
            this.router.navigate(['admin']);
          }else{
            this.abrirSnackBar("Error actualizando el producto.");
          }
          this.procesando = false;

        })
      }

    }


  }

  eliminarProducto(){
    if (window.confirm("¿Está seguro que desea eliminar este producto?")) {
      this.procesando = false;
      this.inventarioService.deleteProduct(this.productoSeleccionado.idInventario).subscribe(data => {
        if (data.tipoRespuesta == 'Exito') {
          this.abrirSnackBar("Producto eliminado exitosamente.");
          console.log(data);
          this.router.navigate(['admin']);
        }else{
          this.abrirSnackBar("Error eliminando el producto.");
        }
        this.procesando = false;

      });
    }

  }

  public abrirSnackBar(mensaje:string) {
    let config = new MatSnackBarConfig();
    config.duration = 6000;
    config.verticalPosition = "top";
    config.panelClass = ['blue-snackbar'];

    this.snackBar.open(mensaje, 'Ocultar', config);
  }
}
