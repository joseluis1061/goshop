import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  CdkMenuModule,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem
} from '@angular/cdk/menu';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    CdkMenuModule,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  // Método para navegar a una ruta
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
  }
}
