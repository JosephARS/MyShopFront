import { ShippingAddress } from "./shippingAddress";

export class Payer{
  merchantPayerrId: String = "";
  fullName:String = "";
  emailAddress:String = "";
  contactPhone:String = "";
  dniNumber:String = "";
  billingAddress: ShippingAddress = new ShippingAddress;
}
