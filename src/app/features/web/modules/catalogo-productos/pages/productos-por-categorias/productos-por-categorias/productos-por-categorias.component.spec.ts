import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosPorCategoriasComponent } from './productos-por-categorias.component';

describe('ProductosPorCategoriasComponent', () => {
  let component: ProductosPorCategoriasComponent;
  let fixture: ComponentFixture<ProductosPorCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosPorCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosPorCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
