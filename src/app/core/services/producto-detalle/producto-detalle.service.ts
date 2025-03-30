import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { ProductoDetalleModalComponent} from '../../shared/components/producto-detalle-modal/producto-detalle-modal/producto-detalle-modal.component';
import { IProductoDetalle } from '../../interface/producto-detalle.interface';
import { ICloseModal } from '../../interface/close-modal.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoDetalleService {

  constructor(private dialog: Dialog) { }

  /**
   * Abre el modal con detalles del producto
   * @param producto Los datos del producto a mostrar
   * @returns Observable que emite cuando se cierra el modal
   */
  abrirDetalleProducto(producto: IProductoDetalle): Observable<ICloseModal | undefined> {
    const dialogRef = this.dialog.open<ICloseModal>(ProductoDetalleModalComponent, {
      data: producto,
      backdropClass: 'dialog-backdrop',
      hasBackdrop: true,
      // No configuramos width, ya que eso se maneja en el CSS del componente
    });

    return dialogRef.closed;
  }

  /**
   * Método helper para obtener un producto por ID
   * @param id ID del producto
   * @returns Observable con los datos del producto
   */
  getProductoPorId(id: number): Observable<IProductoDetalle> {
    // En una aplicación real, aquí harías una llamada HTTP a tu API
    // Pero para este ejemplo, simulamos con una promesa y datos locales
    return new Observable(observer => {
      setTimeout(() => {
        const producto = this.getProductoEjemplo(id);
        if (producto) {
          observer.next(producto);
          observer.complete();
        } else {
          observer.error(new Error(`Producto con ID ${id} no encontrado`));
        }
      }, 300); // Simula un pequeño retraso de red
    });
  }

  /**
   * Método helper para generar datos de ejemplo para usar con el modal
   * @param id ID del producto
   * @returns Datos completos del producto
   */
  private getProductoEjemplo(id: number): IProductoDetalle {
    // Datos de productos de ejemplo para demostración
    const productos: { [key: number]: IProductoDetalle } = {
      1: {
        id: 1,
        nombre: 'Smart TV 4K 55 pulgadas',
        imagen: '../assets/products/1.jpg',
        precio: 699.99,
        precioAnterior: 799.99,
        descuento: 15,
        categoria: 'Electrónicos',
        descripcion: 'Smart TV 4K con pantalla LED de 55 pulgadas, resolución Ultra HD, sistema operativo Smart TV, conectividad WiFi, Bluetooth y múltiples puertos HDMI y USB para conectar tus dispositivos.',
        caracteristicas: [
          'Resolución 4K Ultra HD',
          'Pantalla LED de 55 pulgadas',
          'Smart TV con asistente de voz integrado',
          'WiFi y Bluetooth incorporado',
          '3 puertos HDMI y 2 puertos USB',
          'Sonido envolvente'
        ],
        rating: 4.8,
        opiniones: 120,
        stock: 15,
        estado: 'En stock'
      },
      2: {
        id: 2,
        nombre: 'Licuadora 5 Velocidades',
        imagen: '../assets/products/2.jpg',
        precio: 49.99,
        categoria: 'Hogar',
        descripcion: 'Licuadora potente con 5 velocidades diferentes, cuchillas de acero inoxidable y jarra de vidrio resistente de alta capacidad. Ideal para preparar batidos, salsas y sopas.',
        caracteristicas: [
          '5 velocidades + función pulso',
          'Jarra de vidrio de 1.5 litros',
          'Cuchillas de acero inoxidable',
          'Motor de 600W',
          'Base antideslizante',
          'Fácil de limpiar'
        ],
        rating: 4.5,
        opiniones: 85,
        stock: 20,
        estado: 'En stock'
      },
      5: {
        id: 5,
        nombre: 'Auriculares Bluetooth Premium',
        imagen: '../assets/products/5.jpg',
        precio: 129.99,
        categoria: 'Electrónicos',
        descripcion: 'Auriculares inalámbricos con tecnología Bluetooth 5.0, cancelación activa de ruido, micrófono incorporado para llamadas, batería de larga duración y diseño ergonómico para máxima comodidad.',
        caracteristicas: [
          'Bluetooth 5.0 de largo alcance',
          'Cancelación activa de ruido',
          'Batería de hasta 30 horas',
          'Micrófono de alta definición',
          'Controles táctiles',
          'Estuche de carga incluido'
        ],
        rating: 4.6,
        opiniones: 98,
        stock: 12,
        estado: 'En stock'
      },
      7: {
        id: 7,
        nombre: 'Zapatillas Running Ergonómicas',
        imagen: '../assets/products/7.jpg',
        precio: 89.99,
        precioAnterior: 99.99,
        descuento: 10,
        categoria: 'Ropa',
        descripcion: 'Zapatillas de running con diseño ergonómico, suela amortiguadora, material transpirable y sistema de cordones rápidos. Perfectas para entrenamiento diario y carreras de media distancia.',
        caracteristicas: [
          'Diseño ligero y ergonómico',
          'Suela con tecnología de amortiguación',
          'Material exterior transpirable',
          'Plantilla removible',
          'Sistema de cordones rápidos',
          'Disponible en varias tallas'
        ],
        rating: 4.4,
        opiniones: 37,
        stock: 0,
        estado: 'Agotado'
      }
    };

    // Devolvemos el producto solicitado o el primero si no existe
    return productos[id] || productos[1];
  }
}
