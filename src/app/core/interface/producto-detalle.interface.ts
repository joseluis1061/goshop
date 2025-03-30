export interface IProductoDetalle {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  precioAnterior?: number;
  descuento?: number;
  categoria: string;
  descripcion: string;
  caracteristicas: string[];
  rating: number;
  opiniones: number;
  stock: number;
  estado: string;
}
