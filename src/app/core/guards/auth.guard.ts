import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Comprobar si el usuario está autenticado
    if (this.authService.isLoggedIn) {
      // Si se requiere un rol específico para la ruta
      const requiredRole = route.data['role'] as string;

      if (requiredRole && this.authService.currentUser?.role !== requiredRole) {
        // Usuario no tiene el rol requerido
        // Redirigir a página de acceso denegado o al home
        return this.router.createUrlTree(['/acceso-denegado']);
      }

      // Usuario autenticado y con permisos adecuados
      return true;
    }

    // Usuario no autenticado, guardar la URL intentada para redirigir después del login
    // y enviar al login
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
