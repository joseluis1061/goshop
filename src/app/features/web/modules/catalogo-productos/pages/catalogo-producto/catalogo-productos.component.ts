import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../../../core/shared/components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoDetalleModalComponent } from '../../../../../../core/shared/components/producto-detalle-modal/producto-detalle-modal/producto-detalle-modal.component';
import { IProductoDetalle } from '../../../../../../core/interface/producto-detalle.interface';
import { ICloseModal } from '../../../../../../core/interface/close-modal.interface';

@Component({
  selector: 'app-catalogo-productos',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule],
  templateUrl: './catalogo-productos.component.html',
  styleUrl: './catalogo-productos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoProductosComponent implements OnInit {

  // Productos de ejemplo (normalmente vendrían de un servicio)
  productos: IProductoDetalle[] = [
    {
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
    {
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
    {
      id: 3,
      nombre: 'Chaqueta Deportiva Impermeable',
      imagen: '../assets/products/3.jpg',
      precio: 79.99,
      precioAnterior: 99.99,
      descuento: 20,
      categoria: 'Ropa',
      descripcion: 'Chaqueta deportiva impermeable con tecnología de protección contra viento y lluvia. Material ligero y transpirable ideal para actividades al aire libre en cualquier condición climática.',
      caracteristicas: [
        'Material impermeable con costuras selladas',
        'Capucha ajustable con cordón',
        'Bolsillos con cierre de cremallera',
        'Puños elásticos para mayor comodidad',
        'Tejido transpirable',
        'Disponible en varios colores y tallas'
      ],
      rating: 4.7,
      opiniones: 63,
      stock: 8,
      estado: 'Pocas unidades'
    },
    {
      id: 4,
      nombre: 'Café Gourmet Premium 1kg',
      imagen: '../assets/products/4.jpg',
      precio: 24.99,
      categoria: 'Alimentos',
      descripcion: 'Café gourmet de tueste medio con notas de chocolate y frutos secos. Granos seleccionados de las mejores regiones cafeteras, tostados artesanalmente para obtener un sabor equilibrado y aromático.',
      caracteristicas: [
        'Tueste medio',
        'Origen: mezcla de América Latina',
        'Notas de chocolate y frutos secos',
        'Envasado al vacío para máxima frescura',
        'Café de especialidad certificado',
        'Ideal para espresso y filtro'
      ],
      rating: 4.9,
      opiniones: 42,
      stock: 25,
      estado: 'En stock'
    },
    {
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
    {
      id: 6,
      nombre: 'Juego de Sábanas 100% Algodón',
      imagen: '../assets/products/6.jpg',
      precio: 35.99,
      categoria: 'Hogar',
      descripcion: 'Juego de sábanas premium fabricadas con algodón egipcio de 400 hilos, suaves al tacto y duraderas. El set incluye sábana encimera, sábana bajera ajustable y dos fundas de almohada.',
      caracteristicas: [
        'Algodón egipcio 100% de alta calidad',
        '400 hilos para mayor suavidad',
        'Resistentes al desgaste y decoloración',
        'Transpirables para todas las estaciones',
        'Disponibles en varios colores',
        'Fácil mantenimiento, lavable a máquina'
      ],
      rating: 4.3,
      opiniones: 51,
      stock: 18,
      estado: 'En stock'
    },
    {
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
    },
    {
      id: 8,
      nombre: 'Set de Especias Orgánicas',
      imagen: '../assets/products/8.jpg',
      precio: 19.99,
      categoria: 'Alimentos',
      descripcion: 'Colección de 12 especias orgánicas esenciales en frascos de vidrio reutilizables. Incluye pimienta negra, comino, orégano, pimentón, canela y más. Todas certificadas como orgánicas y de comercio justo.',
      caracteristicas: [
        '12 especias orgánicas diferentes',
        'Frascos de vidrio herméticos',
        'Sin aditivos ni conservantes',
        'Certificación orgánica y de comercio justo',
        'Etiquetas con información de uso',
        'Organizador incluido'
      ],
      rating: 4.7,
      opiniones: 68,
      stock: 15,
      estado: 'En stock'
    },
    {
      id: 9,
      nombre: 'Tablet 10 pulgadas',
      imagen: '../assets/products/9.jpg',
      precio: 299.99,
      categoria: 'Electrónicos',
      descripcion: 'Tablet de 10 pulgadas con pantalla Full HD, procesador octa-core, 4GB de RAM y 64GB de almacenamiento ampliable. Perfecta para entretenimiento, trabajo y estudio con una gran autonomía de batería.',
      caracteristicas: [
        'Pantalla Full HD de 10 pulgadas',
        'Procesador octa-core de 2.0GHz',
        '4GB RAM y 64GB almacenamiento (ampliable)',
        'Batería de 7000mAh (hasta 12 horas)',
        'Cámara trasera 13MP y frontal 5MP',
        'WiFi, Bluetooth 5.0 y GPS'
      ],
      rating: 4.5,
      opiniones: 75,
      stock: 10,
      estado: 'En stock'
    },
    {
      id: 10,
      nombre: 'Cámara Digital HD',
      imagen: '../assets/products/10.jpg',
      precio: 449.99,
      precioAnterior: 499.99,
      descuento: 10,
      categoria: 'Electrónicos',
      descripcion: 'Cámara digital con sensor CMOS de 24MP, zoom óptico 30x, grabación de video 4K y pantalla táctil abatible. Incluye conectividad WiFi y Bluetooth para transferencia instantánea de fotos y control remoto.',
      caracteristicas: [
        'Sensor CMOS de 24 megapíxeles',
        'Zoom óptico 30x y digital 4x',
        'Grabación de video 4K/30fps',
        'Pantalla táctil LCD abatible de 3"',
        'Estabilización de imagen óptica',
        'WiFi, Bluetooth y puerto USB-C'
      ],
      rating: 4.7,
      opiniones: 56,
      stock: 5,
      estado: 'Pocas unidades'
    },
    {
      id: 11,
      nombre: 'Sartén Antiadherente 28cm',
      imagen: '../assets/products/11.jpg',
      precio: 32.99,
      categoria: 'Hogar',
      descripcion: 'Sartén antiadherente de 28cm de diámetro con recubrimiento libre de PFOA, fondo difusor de calor para cocción uniforme y mango ergonómico termorresistente. Apta para todo tipo de cocinas incluidas de inducción.',
      caracteristicas: [
        'Recubrimiento antiadherente triple capa',
        'Libre de PFOA y materiales tóxicos',
        'Fondo difusor para distribución uniforme del calor',
        'Mango ergonómico termorresistente',
        'Apta para cocinas de gas, eléctricas e inducción',
        'Fácil limpieza, apta para lavavajillas'
      ],
      rating: 4.6,
      opiniones: 47,
      stock: 22,
      estado: 'En stock'
    },
    {
      id: 12,
      nombre: 'Reloj Inteligente Deportivo',
      imagen: '../assets/products/12.jpg',
      precio: 159.99,
      precioAnterior: 179.99,
      descuento: 11,
      categoria: 'Electrónicos',
      descripcion: 'Reloj inteligente con pantalla AMOLED, monitorización cardíaca y de oxígeno en sangre, GPS integrado, 14 días de autonomía y resistencia al agua 5ATM. Más de 100 modos deportivos y funciones de salud avanzadas.',
      caracteristicas: [
        'Pantalla AMOLED de 1.39" a color',
        'Monitorización cardíaca 24h y SpO2',
        'GPS integrado y 100+ modos deportivos',
        'Autonomía de 14 días en uso normal',
        'Resistencia al agua 5ATM (50m)',
        'Notificaciones inteligentes y control de música'
      ],
      rating: 4.5,
      opiniones: 83,
      stock: 18,
      estado: 'En stock'
    },
    {
      id: 13,
      nombre: 'Mochila Impermeable Portátil',
      imagen: '../assets/products/13.jpg',
      precio: 45.99,
      categoria: 'Ropa',
      descripcion: 'Mochila impermeable con compartimento acolchado para portátil de hasta 15.6", múltiples bolsillos organizadores, puerto USB integrado y diseño ergonómico con acolchado transpirable. Ideal para viajes, trabajo y estudios.',
      caracteristicas: [
        'Material impermeable resistente',
        'Compartimento acolchado para portátil 15.6"',
        'Puerto USB integrado con cable',
        'Múltiples bolsillos organizadores',
        'Espalda acolchada transpirable',
        'Capacidad: 25 litros'
      ],
      rating: 4.6,
      opiniones: 59,
      stock: 14,
      estado: 'En stock'
    },
    {
      id: 14,
      nombre: 'Aceite de Oliva Virgen Extra 1L',
      imagen: '../assets/products/14.jpg',
      precio: 15.99,
      categoria: 'Alimentos',
      descripcion: 'Aceite de oliva virgen extra de primera prensada en frío, con acidez máxima de 0.4%. Producido en España con aceitunas seleccionadas manualmente y envasado en botella de vidrio oscuro para preservar sus propiedades.',
      caracteristicas: [
        'Aceite virgen extra (categoría superior)',
        'Primera extracción en frío',
        'Acidez máxima 0.4%',
        'Origen: España (Denominación de Origen)',
        'Botella de vidrio oscuro protector',
        'Cosecha del año actual'
      ],
      rating: 4.8,
      opiniones: 35,
      stock: 30,
      estado: 'En stock'
    },
    {
      id: 15,
      nombre: 'Altavoz Bluetooth Portátil',
      imagen: '../assets/products/15.jpg',
      precio: 79.99,
      precioAnterior: 89.99,
      descuento: 11,
      categoria: 'Electrónicos',
      descripcion: 'Altavoz Bluetooth portátil con sonido 360°, resistencia al agua IPX7, 20 horas de autonomía y posibilidad de emparejamiento estéreo con otro altavoz idéntico. Incluye micrófono integrado para llamadas manos libres.',
      caracteristicas: [
        'Sonido 360° con doble radiador pasivo',
        'Bluetooth 5.1 con alcance de 30m',
        'Resistencia al agua IPX7 (sumergible)',
        '20 horas de reproducción continua',
        'Emparejamiento estéreo con otro altavoz',
        'Micrófono integrado para llamadas'
      ],
      rating: 4.7,
      opiniones: 72,
      stock: 16,
      estado: 'En stock'
    },
    {
      id: 16,
      nombre: 'Set de Cuchillos Profesionales',
      imagen: '../assets/products/16.jpg',
      precio: 69.99,
      categoria: 'Hogar',
      descripcion: 'Set de 6 cuchillos profesionales de acero inoxidable alemán con mango ergonómico y bloque de almacenamiento de madera. Incluye cuchillo de chef, santoku, para pan, de utilidad, para deshuesar y cuchillo puntilla.',
      caracteristicas: [
        'Acero inoxidable alemán de alta calidad',
        'Hojas afiladas con precisión',
        'Mangos ergonómicos antideslizantes',
        'Bloque de madera para almacenamiento',
        'Incluye 6 tipos de cuchillos diferentes',
        'Resistentes al óxido y la corrosión'
      ],
      rating: 4.5,
      opiniones: 46,
      stock: 9,
      estado: 'Pocas unidades'
    }
  ];
  constructor(
    private dialog: Dialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  /**
   * Maneja el clic en la imagen de un producto para mostrar el modal de detalle
   * @param producto El producto seleccionado
   */
  abrirDetalleProducto(producto: IProductoDetalle): void {
    const dialogRef = this.dialog.open<ICloseModal>(ProductoDetalleModalComponent, {
      data: producto,
      backdropClass: 'dialog-backdrop',
      hasBackdrop: true
    });

    // Suscripción al cierre del modal para manejar acciones
    dialogRef.closed.subscribe(result => {
      if (result) {
        switch (result.accion) {
          case 'agregar':
            // Lógica para agregar al carrito
            console.log('Agregar al carrito:', result.producto, 'Cantidad:', result.cantidad);
            this.agregarAlCarrito(result.producto, result.cantidad || 1);
            break;
          case 'verDisponibilidad':
            // Navegación a la página de disponibilidad en tiendas
            console.log('Ver disponibilidad en tiendas:', result.producto);
            this.router.navigate(['/disponibilidad-productos-pv'], {
              queryParams: { productoId: result.producto.id }
            });
            break;
        }
      }
    });
  }

  /**
   * Agrega un producto al carrito de compras
   * @param producto El producto a agregar
   * @param cantidad La cantidad del producto
   */
  agregarAlCarrito(producto: IProductoDetalle, cantidad: number): void {
    // Aquí iría la lógica para agregar el producto al carrito
    // Por ejemplo, enviar a un servicio de carrito o estado global

    // Simulación simple de feedback para el usuario
    alert(`Producto "${producto.nombre}" agregado al carrito (Cantidad: ${cantidad})`);
  }
}
