export class PagoResponse{
  pagoId: number = 0;
  state:String = "";
  orderId: number = 0;
  transactionId:String = "";
  authorizationCode:String = "";
  networkResponseCode: String = "";
  responseCode:String = "";
  errorCode:String = "";
  responseMessage:String = "";
  operationDate!: Date;
}
