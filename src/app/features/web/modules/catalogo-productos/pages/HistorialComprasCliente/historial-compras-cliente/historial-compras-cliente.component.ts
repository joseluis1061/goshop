import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../../../../core/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-historial-compras-cliente',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './historial-compras-cliente.component.html',
  styleUrl: './historial-compras-cliente.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistorialComprasClienteComponent implements OnInit {
  // Datos de prueba para el historial de compras
  purchases = [
    {
      id: 1,
      orderNumber: 'ORD-20250315-001',
      date: '15/03/2025',
      total: 849.97,
      status: 'Entregado',
      items: [
        {
          id: 1,
          name: 'Smart TV 4K 55 pulgadas',
          price: 699.99,
          quantity: 1,
          image: '../assets/products/1.jpg'
        },
        {
          id: 5,
          name: 'Auriculares Bluetooth Premium',
          price: 129.99,
          quantity: 1,
          image: '../assets/products/5.jpg'
        },
        {
          id: 4,
          name: 'Café Gourmet Premium 1kg',
          price: 19.99,
          quantity: 1,
          image: '../assets/products/4.jpg'
        }
      ]
    },
    {
      id: 2,
      orderNumber: 'ORD-20250228-042',
      date: '28/02/2025',
      total: 135.97,
      status: 'Entregado',
      items: [
        {
          id: 2,
          name: 'Licuadora 5 Velocidades',
          price: 49.99,
          quantity: 1,
          image: '../assets/products/2.jpg'
        },
        {
          id: 6,
          name: 'Juego de Sábanas 100% Algodón',
          price: 35.99,
          quantity: 1,
          image: '../assets/products/6.jpg'
        },
        {
          id: 8,
          name: 'Set de Especias Orgánicas',
          price: 49.99,
          quantity: 1,
          image: '../assets/products/8.jpg'
        }
      ]
    },
    {
      id: 3,
      orderNumber: 'ORD-20250110-089',
      date: '10/01/2025',
      total: 179.98,
      status: 'Entregado',
      items: [
        {
          id: 3,
          name: 'Chaqueta Deportiva Impermeable',
          price: 79.99,
          quantity: 1,
          image: '../assets/products/3.jpg'
        },
        {
          id: 7,
          name: 'Zapatillas Running Ergonómicas',
          price: 99.99,
          quantity: 1,
          image: '../assets/products/7.jpg'
        }
      ]
    }
  ];

  // Estado para controlar qué pedido está desplegado
  expandedOrderId: number | null = null;

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Método para expandir/contraer los detalles de un pedido
  toggleOrderDetails(orderId: number): void {
    if (this.expandedOrderId === orderId) {
      this.expandedOrderId = null;
    } else {
      this.expandedOrderId = orderId;
    }
  }

  // Método para verificar si un pedido está expandido
  isOrderExpanded(orderId: number): boolean {
    return this.expandedOrderId === orderId;
  }

  // Método para obtener la clase CSS según el estado del pedido
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'En proceso':
        return 'bg-blue-100 text-blue-800 border-blue-400';
      case 'Enviado':
        return 'bg-indigo-100 text-indigo-800 border-indigo-400';
      case 'Entregado':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 border-red-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  }
}
