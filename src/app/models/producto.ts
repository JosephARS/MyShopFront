export class Producto {

  id: number;
  nombre: string;
  imgUrl: string;
  precio: number;
  descripcion: string;
  stock: number;
  cantidadCompra: number;

  constructor(pId: number, pNombre: string, pImgUrl: string, pPrecio: number, pDescripcion: string) {
    this.id = pId;
    this.nombre = pNombre;
    this.imgUrl = pImgUrl;
    this.precio= pPrecio;
    this.descripcion = pDescripcion;
    this.stock = 0;
    this.cantidadCompra = 0;
  }

}
