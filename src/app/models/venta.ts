import { Cliente } from "./cliente";
import { Shipping } from "./shipping";

export class Venta{
  idProceso(oDatosAnulacion: any, idProceso: any) {
    throw new Error('Method not implemented.');
  }
  idVenta!: number
  idPago!: number;
  estado!: String;
  precio!: number;
  fecha!: Date;
  cliente: Cliente = new Cliente;
  shipping: Shipping = new Shipping;
}
