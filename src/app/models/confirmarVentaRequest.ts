import { Cliente } from "./cliente";
import { Producto } from "./producto";
import { Shipping } from "./shipping";

export class ConfirmarVentaRequest{

  idPago!: number;
  estado!: String;
  valor!: number;
  cliente: Cliente = new Cliente;
  shipping: Shipping = new Shipping;
  listaProductos: Producto[] = [];
}
