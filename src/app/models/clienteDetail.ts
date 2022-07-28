import { Cliente } from "./cliente";
import { Shipping } from "./shipping";
import { TokenizedCard } from "./tokenizedCard";

export class ClienteDetail{
  shipping: Shipping = new Shipping;
  cliente: Cliente = new Cliente;
  cardList: TokenizedCard[] = [];
}
