import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

interface ProductoCarrito {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  precioOriginal?: number;
  descuento?: number;
  cantidad: number;
  categoria: string;
  stock: number;
}

@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, NavbarComponent],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarritoComprasComponent implements OnInit {
  // Datos de ejemplo para el carrito
  productosCarrito: ProductoCarrito[] = [
    {
      id: 1,
      nombre: 'Smart TV 4K 55 pulgadas',
      imagen: '../assets/products/1.jpg',
      precio: 699.99,
      precioOriginal: 799.99,
      descuento: 15,
      cantidad: 1,
      categoria: 'Electrónicos',
      stock: 15
    },
    {
      id: 5,
      nombre: 'Auriculares Bluetooth Premium',
      imagen: '../assets/products/5.jpg',
      precio: 129.99,
      cantidad: 2,
      categoria: 'Electrónicos',
      stock: 12
    },
    {
      id: 8,
      nombre: 'Set de Especias Orgánicas',
      imagen: '../assets/products/8.jpg',
      precio: 19.99,
      cantidad: 1,
      categoria: 'Alimentos',
      stock: 15
    }
  ];

  // Formulario para código de descuento
  codigoDescuentoForm!: FormGroup;

  // Descuento aplicado (ejemplo)
  descuentoAplicado: boolean = false;
  porcentajeDescuento: number = 0;

  // Valores calculados
  subtotal: number = 0;
  descuento: number = 0;
  impuestos: number = 0;
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.calcularTotales();
  }

  private inicializarFormulario(): void {
    this.codigoDescuentoForm = this.fb.group({
      codigo: ['', Validators.required]
    });
  }

  // Calcular el subtotal, descuento, impuestos y total
  calcularTotales(): void {
    // Calcular subtotal (suma de precio * cantidad para cada producto)
    this.subtotal = this.productosCarrito.reduce(
      (acum, producto) => acum + (producto.precio * producto.cantidad),
      0
    );

    // Calcular descuento (si hay alguno aplicado)
    this.descuento = this.descuentoAplicado
      ? this.subtotal * (this.porcentajeDescuento / 100)
      : 0;

    // Calcular impuestos (ejemplo: 16% sobre subtotal - descuento)
    this.impuestos = (this.subtotal - this.descuento) * 0.16;

    // Calcular total
    this.total = this.subtotal - this.descuento + this.impuestos;
  }

  // Incrementar cantidad de un producto
  incrementarCantidad(producto: ProductoCarrito): void {
    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.calcularTotales();
    }
  }

  // Decrementar cantidad de un producto
  decrementarCantidad(producto: ProductoCarrito): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotales();
    }
  }

  // Eliminar producto del carrito
  eliminarProducto(productoId: number): void {
    this.productosCarrito = this.productosCarrito.filter(
      producto => producto.id !== productoId
    );
    this.calcularTotales();
  }

  // Aplicar código de descuento
  aplicarCodigoDescuento(): void {
    if (this.codigoDescuentoForm.valid) {
      const codigo = this.codigoDescuentoForm.get('codigo')?.value;

      // Simular validación de código (en una app real esto sería un servicio)
      if (codigo === 'DESCUENTO20') {
        this.descuentoAplicado = true;
        this.porcentajeDescuento = 20;
        this.calcularTotales();
      } else {
        // Código inválido
        this.codigoDescuentoForm.setErrors({ codigoInvalido: true });
      }
    }
  }

  // Eliminar código de descuento
  eliminarCodigoDescuento(): void {
    this.descuentoAplicado = false;
    this.porcentajeDescuento = 0;
    this.codigoDescuentoForm.reset();
    this.calcularTotales();
  }

  // Proceder al checkout
  procederCheckout(): void {
    // En una app real, aquí guardarías el estado del carrito
    // y redirigirías a la página de checkout
    this.router.navigate(['/checkout']);
  }

  // Continuar comprando
  continuarComprando(): void {
    this.router.navigate(['/catalogo-productos']);
  }

  // Verificar si el carrito está vacío
  get carritoVacio(): boolean {
    return this.productosCarrito.length === 0;
  }
}
