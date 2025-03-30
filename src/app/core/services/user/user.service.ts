import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserRegistration {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  direccion: string;
  telefono: string;
}

export interface UserProfile {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  direccion: string;
  telefono: string;
  fechaRegistro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: UserProfile[] = [
    {
      id: 1,
      nombre: 'Administrador',
      apellidos: 'Sistema',
      email: 'admin@example.com',
      direccion: 'Calle Principal 123',
      telefono: '1234567890',
      fechaRegistro: new Date('2023-01-01')
    },
    {
      id: 2,
      nombre: 'Cliente',
      apellidos: 'Ejemplo',
      email: 'cliente@example.com',
      direccion: 'Avenida Secundaria 456',
      telefono: '0987654321',
      fechaRegistro: new Date('2023-02-15')
    }
  ];

  constructor() { }

  /**
   * Registra un nuevo usuario
   * @param userData Datos del usuario a registrar
   * @returns Observable con el perfil del usuario registrado
   */
  registerUser(userData: UserRegistration): Observable<UserProfile> {
    // Verificar si el email ya está en uso
    const existingUser = this.users.find(user => user.email === userData.email);

    if (existingUser) {
      return throwError(() => new Error('El correo electrónico ya está registrado'));
    }

    // Crear nuevo perfil de usuario
    const newUser: UserProfile = {
      id: this.generateUserId(),
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      email: userData.email,
      direccion: userData.direccion,
      telefono: userData.telefono,
      fechaRegistro: new Date()
    };

    // Agregar a la lista (en una app real, esto sería una llamada API)
    this.users.push(newUser);

    // Simular retardo de red
    return of(newUser).pipe(delay(1000));
  }

  /**
   * Obtiene el perfil de un usuario por su ID
   * @param userId ID del usuario
   * @returns Observable con el perfil del usuario
   */
  getUserProfile(userId: number): Observable<UserProfile> {
    const user = this.users.find(u => u.id === userId);

    if (!user) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    return of(user).pipe(delay(300));
  }

  /**
   * Actualiza el perfil de un usuario
   * @param userId ID del usuario
   * @param userData Datos a actualizar
   * @returns Observable con el perfil actualizado
   */
  updateUserProfile(userId: number, userData: Partial<UserProfile>): Observable<UserProfile> {
    const userIndex = this.users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return throwError(() => new Error('Usuario no encontrado'));
    }

    // Verificar si se está intentando cambiar el email a uno ya existente
    if (userData.email && userData.email !== this.users[userIndex].email) {
      const emailExists = this.users.some(u => u.id !== userId && u.email === userData.email);

      if (emailExists) {
        return throwError(() => new Error('El correo electrónico ya está en uso por otro usuario'));
      }
    }

    // Actualizar datos
    const updatedUser = { ...this.users[userIndex], ...userData };
    this.users[userIndex] = updatedUser;

    return of(updatedUser).pipe(delay(500));
  }

  /**
   * Verifica si un email ya está registrado
   * @param email Email a verificar
   * @returns true si el email ya está en uso
   */
  isEmailRegistered(email: string): Observable<boolean> {
    const exists = this.users.some(user => user.email === email);
    return of(exists).pipe(delay(300));
  }

  /**
   * Genera un ID de usuario único
   * @returns ID único
   */
  private generateUserId(): number {
    return Math.max(0, ...this.users.map(u => u.id)) + 1;
  }
}
