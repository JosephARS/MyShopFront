import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AnularPago } from 'src/app/models/anularPago';
import { Producto } from 'src/app/models/producto';
import { Venta } from 'src/app/models/venta';
import { InventarioService } from 'src/app/services/http/inventario.service';
import { TransactionalService } from 'src/app/services/http/transactional.service';
import { VentasService } from 'src/app/services/http/ventas.service';
import { DialogoAnulacionComponent } from '../dialogo-anulacion/dialogo-anulacion.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  displayedColumns: string[] = ['idVenta', 'estado', 'precio', 'cliente', 'direccion', 'fecha', 'anular'];
  dataSource = new MatTableDataSource<any>();
  procesando = false;
  ventasLista: Venta[] = [];
  listaProductos: Producto[] = [];

  HighlightRow=null;

  constructor(private ventasService: VentasService,
    private transactionalService: TransactionalService,
    private inventarioService:InventarioService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.procesando = true;
    this.ventasService.getVentasList().subscribe(data => {

      if (data.tipoRespuesta == 'Exito') {
        this.ventasLista = data.listaResultado;
        this.ventasLista.sort(function(a, b){return b.idVenta - a.idVenta});

        this.dataSource = new MatTableDataSource<Venta>(this.ventasLista);
        console.log(data);
      }else{
        this.abrirSnackBar(data.mensaje);
      }
      this.procesando = false;

    })
  }

  abrirDialogo(venta:Venta, index: any) {
    this.HighlightRow = index;

    this.dialog
    .open(DialogoAnulacionComponent, { })
    .afterClosed().subscribe((respuesta: string) => {
      this.HighlightRow = null;
      let observacion = respuesta;
      if (observacion != undefined){

        console.log("Ingresaaaaa" +observacion);
        this.anularPago(venta, observacion);
      }
    });
  }

  anularPago(venta:Venta, observacion: any) {
    this.procesando = true;
    const anulacion = new AnularPago();
    anulacion.pagoId = venta.idPago;
    anulacion.observacion = observacion;
    this.transactionalService.postAnularPago(anulacion).subscribe(data => {

      if (data.tipoRespuesta == 'Exito') {

        this.ventasService.postConfirmarAnulacion(venta).subscribe( data =>{
console.log(data)
          if (data.tipoRespuesta == 'Exito') {

            this.listaProductos = data.listaResultado;
            let accion = "Anular"

            this.inventarioService.putUpdateStock(this.listaProductos, accion).subscribe( data => {
              console.log(data)
              if (data.tipoRespuesta == 'Exito') {
                this.abrirSnackBar("Anulación de pago realizada con éxito");
                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true})
                .then( () => this.router.navigate([currentUrl]));
                console.log(currentUrl);
              }else{
                this.abrirSnackBar("Error intentando actualizar stock.");
              }
            });

          }else{
            this.procesando = false;
            this.abrirSnackBar("Error intentando anular venta.");
          }

        });

      }else{
        this.procesando = false;
        console.log(data);
        this.abrirSnackBar("Error intentando anular pago.");
      }
      this.procesando = false;
    });
  }


  public abrirSnackBar(mensaje:string) {
    let config = new MatSnackBarConfig();
    config.duration = 6000;
    config.verticalPosition = "top";
    config.panelClass = ['blue-snackbar'];

    this.snackBar.open(mensaje, 'Ocultar', config);
  }


}

