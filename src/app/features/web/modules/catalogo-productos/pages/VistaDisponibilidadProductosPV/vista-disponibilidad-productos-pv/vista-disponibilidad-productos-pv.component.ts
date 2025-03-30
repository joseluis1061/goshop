import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../../../../core/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-vista-disponibilidad-productos-pv',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './vista-disponibilidad-productos-pv.component.html',
  styleUrl: './vista-disponibilidad-productos-pv.component.scss'
})
export class VistaDisponibilidadProductosPVComponent  implements OnInit {
  // Datos simulados de puntos de venta
  puntosVenta = [
    {
      id: 1,
      nombre: 'Tienda Centro Comercial',
      direccion: 'Av. Principal #123, Centro Comercial Plaza Mayor, Local 45',
      telefono: '(123) 456-7890',
      horario: 'Lun - Sáb: 10:00 - 20:00, Dom: 11:00 - 18:00',
      productos: 125,
      distancia: 1.8
    },
    {
      id: 2,
      nombre: 'Tienda Norte',
      direccion: 'Calle 78 #45-67, Centro Comercial Norte',
      telefono: '(123) 456-7891',
      horario: 'Lun - Sáb: 9:00 - 19:00, Dom: Cerrado',
      productos: 98,
      distancia: 4.2
    },
    {
      id: 3,
      nombre: 'Tienda Sur',
      direccion: 'Carrera 23 #89-12, Plaza del Sur, Local 12',
      telefono: '(123) 456-7892',
      horario: 'Lun - Dom: 10:00 - 21:00',
      productos: 112,
      distancia: 7.5
    }
  ];

  // Producto seleccionado (simulación)
  productoSeleccionado = {
    id: 5,
    nombre: 'Auriculares Bluetooth Premium',
    imagen: '../assets/products/5.jpg',
    precio: 129.99,
    categoria: 'Electrónicos',
    disponibilidad: [
      {
        puntoVenta: 1,
        stock: 12,
        estado: 'En stock'
      },
      {
        puntoVenta: 2,
        stock: 5,
        estado: 'Pocas unidades'
      },
      {
        puntoVenta: 3,
        stock: 0,
        estado: 'Agotado'
      }
    ]
  };

  // Punto de venta seleccionado
  puntoVentaSeleccionado: number | null = null;

  // Opciones de ordenamiento
  ordenamiento = 'disponibilidad'; // 'disponibilidad', 'cercania', 'alfabetico'

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Seleccionar un punto de venta
  seleccionarPuntoVenta(id: number): void {
    this.puntoVentaSeleccionado = id;
  }

  // Obtener el stock para un punto de venta
  getStockEnPuntoVenta(puntoVentaId: number): number {
    const disponibilidad = this.productoSeleccionado.disponibilidad.find(
      d => d.puntoVenta === puntoVentaId
    );
    return disponibilidad ? disponibilidad.stock : 0;
  }

  // Obtener el estado para un punto de venta
  getEstadoEnPuntoVenta(puntoVentaId: number): string {
    const disponibilidad = this.productoSeleccionado.disponibilidad.find(
      d => d.puntoVenta === puntoVentaId
    );
    return disponibilidad ? disponibilidad.estado : 'No disponible';
  }

  // Obtener la clase para el estado de stock
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'En stock':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'Pocas unidades':
        return 'bg-orange-100 text-orange-800 border-orange-400';
      case 'Agotado':
      case 'No disponible':
        return 'bg-red-100 text-red-800 border-red-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  }

  // Cambiar el ordenamiento
  cambiarOrdenamiento(orden: string): void {
    this.ordenamiento = orden;
    // Aquí normalmente ordenarías los puntos de venta según el criterio seleccionado
  }

  // Verificar si un ordenamiento está activo
  isOrdenamientoActivo(orden: string): boolean {
    return this.ordenamiento === orden;
  }
}
