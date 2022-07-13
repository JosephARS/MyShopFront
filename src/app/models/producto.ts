export class Producto {

  idInventario!: number;
  nombre!: string;
  imgUrl!: string| undefined | null;
  precio!: number ;
  descripcion!: string| undefined | null;
  stock!: number;
  cantidadCompra!: number;

  // constructor(pId: number, pNombre: string, pImgUrl: string, pPrecio: number, pDescripcion: string) {
  //   this.idInventario = pId;
  //   this.nombre = pNombre;
  //   this.imgUrl = pImgUrl;
  //   this.precio= pPrecio;
  //   this.descripcion = pDescripcion;
  //   this.stock = 0;
  //   this.cantidadCompra = 0;
  // }

  constructor(){}
}
