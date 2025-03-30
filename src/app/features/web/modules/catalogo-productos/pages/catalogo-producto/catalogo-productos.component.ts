import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../../../core/shared/components/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalogo-productos',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './catalogo-productos.component.html',
  styleUrl: './catalogo-productos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogoProductosComponent implements OnInit {

  ngOnInit(): void { }

}
