import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { IProductoDetalle } from '../../../../interface/producto-detalle.interface';
import { ICloseModal } from '../../../../interface/close-modal.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-detalle-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, RouterLink],
  templateUrl: './producto-detalle-modal.component.html',
  styleUrl: './producto-detalle-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductoDetalleModalComponent implements OnInit {

  // Contador para la cantidad de productos
  cantidad: number = 1;

  constructor(
    public dialogRef: DialogRef<ICloseModal>,
    @Inject(DIALOG_DATA) public data: IProductoDetalle
  ) {}

  ngOnInit(): void {
    // Inicialización del componente
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.dialogRef.close();
  }

  // Incrementar cantidad
  incrementarCantidad(): void {
    if (this.cantidad < this.data.stock) {
      this.cantidad++;
    }
  }

  // Decrementar cantidad
  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  // Agregar al carrito
  agregarAlCarrito(): void {
    // Aquí iría la lógica para agregar al carrito
    // Por ahora, simplemente cerramos el modal con la información
    this.dialogRef.close({
      accion: 'agregar',
      producto: this.data,
      cantidad: this.cantidad
    });
  }

  // Ver disponibilidad en tiendas
  verDisponibilidadTiendas(): void {
    this.dialogRef.close({
      accion: 'verDisponibilidad',
      producto: this.data
    });
  }

  // Calcular las estrellas llenas
  getEstrellasLlenas(): number[] {
    return Array(Math.floor(this.data.rating)).fill(0);
  }

  // Verificar si hay media estrella
  tieneMitadEstrella(): boolean {
    return this.data.rating % 1 >= 0.5;
  }

  // Calcular las estrellas vacías
  getEstrellasVacias(): number[] {
    const estrellasTotales = 5;
    const estrellasLlenas = Math.floor(this.data.rating);
    const tieneMedia = this.tieneMitadEstrella() ? 1 : 0;
    return Array(estrellasTotales - estrellasLlenas - tieneMedia).fill(0);
  }
}
