import { Routes } from '@angular/router';
import { CatalogoProductosComponent } from './modules/catalogo-productos/pages/catalogo-producto/catalogo-productos.component';

export const WEB_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/catalogo-productos/pages/catalogo-producto/catalogo-productos.component').then((m) => m.CatalogoProductosComponent),
    title: 'Catalogo Productos',
  },
  {
    path: 'productos-por-categorias',
    loadComponent: () => import('./modules/catalogo-productos/pages/productos-por-categorias/productos-por-categorias/productos-por-categorias.component').then((m) => m.ProductosPorCategoriasComponent),
  },
  {
    path: 'historial-compras-cliente',
    loadComponent: () => import('./modules/catalogo-productos/pages/HistorialComprasCliente/historial-compras-cliente/historial-compras-cliente.component').then((m) => m.HistorialComprasClienteComponent),
  },
  {
    path: 'disponibilidad-producto',
    loadComponent: () => import('./modules/catalogo-productos/pages/VistaDisponibilidadProductosPV/vista-disponibilidad-productos-pv/vista-disponibilidad-productos-pv.component').then((m) => m.VistaDisponibilidadProductosPVComponent),
  }

];
