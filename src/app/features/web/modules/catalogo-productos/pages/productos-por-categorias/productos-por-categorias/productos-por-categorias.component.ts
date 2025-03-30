import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../../../../core/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-productos-por-categorias',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './productos-por-categorias.component.html',
  styleUrl: './productos-por-categorias.component.scss'
})
export class ProductosPorCategoriasComponent implements OnInit {
  // Categoría actual
  currentCategory: string = 'Electrónicos';

  // Productos organizados por categoría (simulación de datos)
  products = [
    {
      id: 1,
      name: 'Smart TV 4K 55 pulgadas',
      category: 'Electrónicos',
      price: 699.99,
      oldPrice: 799.99,
      discount: 15,
      rating: 4.8,
      reviews: 120,
      image: '../assets/products/1.jpg',
      stock: 'En stock',
    },
    {
      id: 5,
      name: 'Auriculares Bluetooth Premium',
      category: 'Electrónicos',
      price: 129.99,
      rating: 4.6,
      reviews: 98,
      image: '../assets/products/5.jpg',
      stock: 'En stock',
    },
    {
      id: 9,
      name: 'Tablet 10 pulgadas',
      category: 'Electrónicos',
      price: 299.99,
      rating: 4.5,
      reviews: 75,
      image: '../assets/products/9.jpg',
      stock: 'En stock',
    },
    {
      id: 10,
      name: 'Cámara Digital HD',
      category: 'Electrónicos',
      price: 449.99,
      oldPrice: 499.99,
      discount: 10,
      rating: 4.7,
      reviews: 56,
      image: '../assets/products/10.jpg',
      stock: 'Pocas unidades',
    }
  ];

  // Lista de categorías disponibles
  categories = [
    'Electrónicos',
    'Hogar',
    'Ropa',
    'Alimentos',
    'Ofertas'
  ];

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Método para cambiar la categoría actual
  changeCategory(category: string): void {
    this.currentCategory = category;
    // Aquí normalmente irías a buscar los productos de esta categoría a tu servicio
  }

  // Método para verificar si una categoría está activa
  isCategoryActive(category: string): boolean {
    return this.currentCategory === category;
  }
}
