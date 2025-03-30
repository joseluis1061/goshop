import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // En una aplicación real, esto sería una llamada HTTP a tu backend
    return this.mockLogin(credentials).pipe(
      tap(response => {
        // Guardar token y datos de usuario en localStorage o sessionStorage según rememberMe
        const storage = credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.TOKEN_KEY, response.token);
        storage.setItem(this.USER_KEY, JSON.stringify(response.user));

        // Actualizar el subject con el usuario actual
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): void {
    // Limpiar almacenamiento
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);

    // Actualizar el subject
    this.currentUserSubject.next(null);

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Simulación de login para desarrollo
  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    // Lista de usuarios de prueba
    const mockUsers = [
      {
        id: 1,
        email: 'admin@example.com',
        password: 'password123',
        name: 'Administrador',
        role: 'admin'
      },
      {
        id: 2,
        email: 'cliente@example.com',
        password: 'cliente123',
        name: 'Cliente Ejemplo',
        role: 'customer'
      }
    ];

    // Buscar usuario
    const user = mockUsers.find(u => u.email === credentials.email);

    // Comprobar credenciales
    if (user && user.password === credentials.password) {
      const { password, ...userInfo } = user;
      return of({
        user: userInfo,
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 10)
      }).pipe(delay(1000)); // Simular latencia de red
    }

    return throwError(() => new Error('Credenciales incorrectas'));
  }
}
