import { ShippingAddress } from "./shippingAddress";

export class Buyer{
  merchantBuyerId: String = "";
  fullName:String = "";
  emailAddress:String = "";
  contactPhone:String = "";
  dniNumber:String = "";
  shippingAddress: ShippingAddress = new ShippingAddress;
}
