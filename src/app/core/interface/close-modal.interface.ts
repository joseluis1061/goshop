import { IProductoDetalle } from "./producto-detalle.interface";

export interface ICloseModal{
  accion: string;
  producto: IProductoDetalle;
  cantidad?: number;
}
