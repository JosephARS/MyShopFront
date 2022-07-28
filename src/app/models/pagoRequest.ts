import { Buyer } from "./buyer";
import { CreditCard } from "./creditCard";
import { Payer } from "./payer";

export class PagoRequest{

  totalPrice: number = 0;
  totalTax: number = 0;
  currency: string = "";
  buyer: Buyer = new Buyer;
  payer: Payer = new Payer;
  creditCard: CreditCard = new CreditCard;
  paymentMethod: string = "";
  paymentCountry: string = "";
  creditCardTokenId: string = "";
}
