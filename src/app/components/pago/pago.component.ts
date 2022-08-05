import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ClienteDetail } from 'src/app/models/clienteDetail';
import { ConfirmarVentaRequest } from 'src/app/models/confirmarVentaRequest';
import { PagoRequest } from 'src/app/models/pagoRequest';
import { PagoResponse } from 'src/app/models/pagoResponse';
import { Producto } from 'src/app/models/producto';
import { ShippingAddress } from 'src/app/models/shippingAddress';
import { TokenizedCard } from 'src/app/models/tokenizedCard';
import { Venta } from 'src/app/models/venta';
import { CarritoComprasService } from 'src/app/services/components/carrito-compras.service';
import { InventarioService } from 'src/app/services/http/inventario.service';
import { TransactionalService } from 'src/app/services/http/transactional.service';
import { VentasService } from 'src/app/services/http/ventas.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {

  @ViewChild('stepper')
  private myStepper!: MatStepper;

  numDocumento: String ='';
  procesando = false;
  respuestaPago = new PagoResponse();
  pagoSinProcesar = false;
  checkedSaveCard = false;
  withToken = false;

  listaFranquicias: String[] = ["VISA", "MASTERCARD", "AMEX"]

  shippingForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    numDocumento:['', Validators.required],
    telefono:['', Validators.required],
    email:['', Validators.required],
    depto:['', Validators.required],
    ciudad:['', Validators.required],
    direccion:['', Validators.required]
  });

  paymentForm = this.formBuilder.group({
    franquicia: ['', Validators.required],
    numTarjeta:['', Validators.required],
    cvv:['', Validators.required],
    mesExp:['', Validators.required],
    anioExp:['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    numDocumento:['', Validators.required],
    telefono:['', Validators.required],
    email:['', Validators.required],

  });

  totalValor: number = 0;
  listaProductos: Producto[] = [];
  mostrarDatosPago = true;
  mostrarDatosPersona = true;
  mostrarEmail = true;
  emailValidacion = null;
  clienteDetail = new ClienteDetail();
  cardList: TokenizedCard[] = [];
  tokenizedCardSelected!: TokenizedCard;
  mostrarTarjetas = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private carritoComprasService:CarritoComprasService,
              private transactionalService: TransactionalService,
              private inventarioService: InventarioService,
              private ventasService: VentasService,) { }

  ngOnInit(): void {

    this.totalValor = this.carritoComprasService.totalValor;
    this.listaProductos = this.carritoComprasService.arrProductosSeleccionados;
    if (this.totalValor == 0) {
      this.router.navigate(['home'])
    }
  }

  onDatosPersonalesContinuar(){
    this.paymentForm.controls.nombre.setValue(this.shippingForm.value.nombre!);
    this.paymentForm.controls.apellido.setValue(this.shippingForm.value.apellido!);
    this.paymentForm.controls.numDocumento.setValue(this.shippingForm.value.numDocumento!);
    this.paymentForm.controls.email.setValue(this.shippingForm.value.email!);
    this.paymentForm.controls.telefono.setValue(this.shippingForm.value.telefono!);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onValidarEmail(){
    if (this.emailValidacion != null) {
      this.ventasService.getUsuarioInfo(this.emailValidacion).subscribe(data => {
        if (data.tipoRespuesta == 'Exito') {
          this.clienteDetail = data.resultado;
          if (this.clienteDetail.cliente) {

            console.log(data)
            if (this.clienteDetail.cardList.length) {
              this.cardList = this.clienteDetail.cardList;
              this.mostrarTarjetas = true;
            }
            this.shippingForm.controls.direccion.setValue(this.clienteDetail.shipping.direccion);
            this.shippingForm.controls.ciudad.setValue(this.clienteDetail.shipping.ciudad);
            this.shippingForm.controls.depto.setValue(this.clienteDetail.shipping.departamento);
            this.shippingForm.controls.nombre.setValue(this.clienteDetail.cliente.nombre);
            this.shippingForm.controls.apellido.setValue(this.clienteDetail.cliente.apellido);
            this.shippingForm.controls.numDocumento.setValue(this.clienteDetail.cliente.dni);
            this.shippingForm.controls.telefono.setValue(this.clienteDetail.cliente.telefono);
            console.log(data)
          }
          this.shippingForm.controls.email.setValue(this.emailValidacion);
        }
        this.mostrarEmail = false;
    })
    }
  }

  onMostrarTarjeta(){
    this.paymentForm.reset();
    this.onDatosPersonalesContinuar();
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  onPagoTarjetaToken(card: TokenizedCard){
    this.tokenizedCardSelected = card;
    this.paymentForm.controls.cvv.setValue("777")
    this.paymentForm.controls.franquicia.setValue(card.franquicia)
    this.paymentForm.disable();
    this.myStepper.next();
    this.onValidarPago();
  }

  onValidarPago(){

    if (!this.paymentForm.invalid || this.tokenizedCardSelected) {

      this.respuestaPago = new PagoResponse();
      const pagoReq = new PagoRequest();
      this.procesando = true;

      if(this.checkedSaveCard || this.tokenizedCardSelected != undefined){
        console.log(this.checkedSaveCard , this.tokenizedCardSelected)
        this.withToken = true;
        pagoReq.creditCardTokenId = this.tokenizedCardSelected?.token;

      }

      pagoReq.totalPrice = this.totalValor;
      pagoReq.totalTax = 0;
      pagoReq.currency = "COP";
      pagoReq.paymentMethod = this.paymentForm.value.franquicia!;
      pagoReq.paymentCountry = "CO";

      const address = new ShippingAddress();
      address.street1 = this.shippingForm.value.direccion!;
      address.street2 = "";
      address.city = this.shippingForm.value.ciudad!;
      address.country = "CO";
      address.phone = this.shippingForm.value.telefono!;
      address.postalCode = "000000";
      address.state = this.shippingForm.value.depto!;

      pagoReq.buyer.contactPhone = this.shippingForm.value.telefono!;
      pagoReq.buyer.dniNumber = this.shippingForm.value.numDocumento!;
      pagoReq.buyer.emailAddress = this.shippingForm.value.email!;
      pagoReq.buyer.fullName = this.shippingForm.value.nombre! + " " + this.shippingForm.value.apellido!;
      pagoReq.buyer.merchantBuyerId = "1";
      pagoReq.buyer.shippingAddress = address;

      pagoReq.payer.contactPhone = this.paymentForm.value.telefono!;
      pagoReq.payer.dniNumber = this.paymentForm.value.numDocumento!;
      pagoReq.payer.emailAddress = this.paymentForm.value.email!;
      pagoReq.payer.fullName = this.paymentForm.value.nombre! + " " + this.paymentForm.value.apellido!;
      pagoReq.payer.merchantPayerId = "1";
      pagoReq.payer.billingAddress = address;

      pagoReq.creditCard.securityCode = this.paymentForm.value.cvv!;
      pagoReq.creditCard.number = this.paymentForm.value.numTarjeta!;
      pagoReq.creditCard.expirationDate = this.paymentForm.value.anioExp! + "/" + this.paymentForm.value.mesExp;
      pagoReq.creditCard.name = "APPROVED";

        this.transactionalService.postValidarPago(pagoReq, this.withToken).subscribe({
          next: (data) => {
            if (data.tipoRespuesta == 'Exito') {

              this.respuestaPago = data.resultado;
              console.log(data);
              if(this.respuestaPago.networkResponseCode === "00" || this.respuestaPago.state=="APPROVED"){
                this.confirmarVenta();
                this.carritoComprasService.vaciarCarrito();
              } else if (this.respuestaPago.networkResponseCode === null){
                this.mostrarDatosPago= true;
                this.abrirSnackBar("No podemos procesar tu pago en este momento. Intenta más tarde.");
              }else {
                this.mostrarDatosPago= true;
              }
              this.pagoSinProcesar = false;
            }else{
              console.log(data);
              this.pagoSinProcesar = true;
              this.abrirSnackBar("Error intentando validar el pago.");
            }
            this.procesando = false;
        },
          error: (err) => {
            console.log("POST call in error", err);
            this.abrirSnackBar("Intente nuevamente, por favor.");
            this.procesando = false;
          },
          complete: () => console.info('complete')
        });
    }

  }

  confirmarVenta(){

    const ventaReq = new ConfirmarVentaRequest();
    ventaReq.estado = this.respuestaPago.state;
    ventaReq.valor = this.totalValor;
    ventaReq.idPago = this.respuestaPago.pagoId;
    ventaReq.cliente.idCliente = this.clienteDetail?.cliente?.idCliente;
    ventaReq.cliente.nombre = this.shippingForm.value.nombre!;
    ventaReq.cliente.apellido = this.shippingForm.value.apellido!;
    ventaReq.cliente.dni = this.shippingForm.value.numDocumento!;
    ventaReq.cliente.email = this.shippingForm.value.email!;
    ventaReq.cliente.telefono = this.shippingForm.value.telefono!;
    ventaReq.shipping.direccion = this.shippingForm.value.direccion!;
    ventaReq.shipping.ciudad = this.shippingForm.value.ciudad!;
    ventaReq.shipping.departamento = this.shippingForm.value.depto!;
    ventaReq.shipping.pais = "CO";
    ventaReq.shipping.postalCode = "000000";
    ventaReq.listaProductos = this.listaProductos;

    const idToken = this.respuestaPago.creditCardTokenId!;
    const maskedCardNumber = this.respuestaPago.maskedCardNumber!;
    const franquicia = this.paymentForm.value.franquicia!;
    console.log(idToken, maskedCardNumber, franquicia)

    this.ventasService.postConfirmarVenta(ventaReq, idToken, maskedCardNumber, franquicia).subscribe(data => {

      if (data.tipoRespuesta == 'Exito') {

        const venta = data.resultado;

        this.inventarioService.putUpdateStock(this.listaProductos, "venta", venta.idVenta).subscribe( data => {

          if (data.tipoRespuesta == 'Exito') {

            this.abrirSnackBar("Gracias por su compra.");
            this.mostrarDatosPago= false;
            this.mostrarDatosPersona = false;
            this.pagoSinProcesar = false;
          }else{
            console.log(data);
            this.mostrarDatosPago= true;
            this.mostrarDatosPersona = true;
            this.abrirSnackBar("Error actualizando stock.");
          }
        });

      }else{
        console.log(data);
        this.abrirSnackBar("Error intentando confirmar venta.");
      }
      this.procesando = false;
    });

  }

  onChangeFranquicia($event: any){
    console.log("Evento: " + $event.value)
    this.paymentForm.controls.mesExp.setValue("05");
    this.paymentForm.controls.anioExp.setValue("2030");
    this.paymentForm.controls.cvv.setValue("666");
    switch ($event.value) {
      case "VISA":
        this.paymentForm.controls.numTarjeta.setValue("4037997623271984");
        break;

      case "MASTERCARD":
        this.paymentForm.controls.numTarjeta.setValue("5120697176068275");
        break;

      case "AMEX":
        this.paymentForm.controls.numTarjeta.setValue("377847626810864");
        break;

      default:
        break;
    }

  }

  onLlenarCampos(){
    this.shippingForm.controls.direccion.setValue("Carrera 2 # 100-50");
    this.shippingForm.controls.ciudad.setValue("Bogotá");
    this.shippingForm.controls.depto.setValue("Bogota");
    this.shippingForm.controls.nombre.setValue("Abelardo");
    this.shippingForm.controls.apellido.setValue("De la Espriella");
    this.shippingForm.controls.numDocumento.setValue("1012345678");
    this.shippingForm.controls.email.setValue("abc@gmail.com");
    this.shippingForm.controls.telefono.setValue("3002175818");
  }

  onVolverATienda(){
    this.router.navigate(['home']);
  }

  public abrirSnackBar(mensaje:string) {
    let config = new MatSnackBarConfig();
    config.duration = 6000;
    config.verticalPosition = "top";
    config.panelClass = ['blue-snackbar'];

    this.snackBar.open(mensaje, 'Ocultar', config);
  }

}
