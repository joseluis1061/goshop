import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDetalleModalComponent } from './producto-detalle-modal.component';

describe('ProductoDetalleModalComponent', () => {
  let component: ProductoDetalleModalComponent;
  let fixture: ComponentFixture<ProductoDetalleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDetalleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoDetalleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
