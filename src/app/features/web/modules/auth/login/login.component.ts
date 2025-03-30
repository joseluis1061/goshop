import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoggingIn: boolean = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoggingIn = true;
    this.loginError = null;

    // Simulación de envío al servidor
    setTimeout(() => {
      const { email, password } = this.loginForm.value;

      // En una aplicación real, esto sería reemplazado por una llamada a un servicio de autenticación
      if (email === 'admin@example.com' && password === 'password123') {
        // Login exitoso
        this.router.navigate(['/web']);
      } else {
        // Login fallido
        this.loginError = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }

      this.isLoggingIn = false;
    }, 1500);
  }

  // Funciones helper para validación
  get emailControl() { return this.loginForm.get('email'); }
  get passwordControl() { return this.loginForm.get('password'); }

  hasEmailError(): boolean {
    const control = this.emailControl;
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  hasPasswordError(): boolean {
    const control = this.passwordControl;
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getEmailErrorMessage(): string {
    if (this.emailControl?.hasError('required')) {
      return 'El correo electrónico es obligatorio';
    }
    if (this.emailControl?.hasError('email')) {
      return 'Por favor, introduce un correo electrónico válido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.passwordControl?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }
    if (this.passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }
}
