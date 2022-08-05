import { Cliente } from "./cliente";
import { Shipping } from "./shipping";

export class Venta{
  idVenta!: number
  idPago!: number;
  estado!: String;
  valor!: number;
  fecha!: Date;
  cliente: Cliente = new Cliente;
  shipping: Shipping = new Shipping;

  constructor(){}
}
