import { ShippingAddress } from "./shippingAddress";

export class Payer{
  merchantPayerId: String = "";
  fullName:String = "";
  emailAddress:String = "";
  contactPhone:String = "";
  dniNumber:String = "";
  billingAddress: ShippingAddress = new ShippingAddress;
}
