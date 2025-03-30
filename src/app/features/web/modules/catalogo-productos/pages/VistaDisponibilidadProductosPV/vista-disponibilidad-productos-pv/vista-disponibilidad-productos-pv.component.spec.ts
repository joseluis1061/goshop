import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDisponibilidadProductosPVComponent } from './vista-disponibilidad-productos-pv.component';

describe('VistaDisponibilidadProductosPVComponent', () => {
  let component: VistaDisponibilidadProductosPVComponent;
  let fixture: ComponentFixture<VistaDisponibilidadProductosPVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaDisponibilidadProductosPVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaDisponibilidadProductosPVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
