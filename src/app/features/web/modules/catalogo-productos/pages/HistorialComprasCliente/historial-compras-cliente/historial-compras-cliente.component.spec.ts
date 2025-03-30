import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialComprasClienteComponent } from './historial-compras-cliente.component';

describe('HistorialComprasClienteComponent', () => {
  let component: HistorialComprasClienteComponent;
  let fixture: ComponentFixture<HistorialComprasClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialComprasClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialComprasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
