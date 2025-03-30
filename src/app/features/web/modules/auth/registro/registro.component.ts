import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isRegistering: boolean = false;
  registroError: string | null = null;
  registroExitoso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegistroForm();
  }

  private initRegistroForm(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', [Validators.required]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      terminosCondiciones: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador para verificar que las contraseñas coinciden
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  // Validador para verificar la fortaleza de la contraseña
  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? { weakPassword: true } : null;
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    this.isRegistering = true;
    this.registroError = null;

    // Simulación de envío al servidor
    setTimeout(() => {
      const formData = this.registroForm.value;

      // En una aplicación real, esto sería reemplazado por una llamada a un servicio de registro
      // Simulamos un registro exitoso
      if (Math.random() > 0.2) { // 80% de probabilidad de éxito
        this.registroExitoso = true;

        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        // Simulación de error (20% de probabilidad)
        this.registroError = 'El correo electrónico ya está registrado. Por favor, utiliza otro o inicia sesión.';
      }

      this.isRegistering = false;
    }, 1500);
  }

  // Funciones helper para validación
  getControl(name: string): AbstractControl | null {
    return this.registroForm.get(name);
  }

  hasError(name: string): boolean {
    const control = this.getControl(name);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(name: string): string {
    const control = this.getControl(name);

    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Este campo es obligatorio';
    }

    if (control.hasError('email')) {
      return 'Por favor, introduce un correo electrónico válido';
    }

    if (control.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Debe tener al menos ${minLength} caracteres`;
    }

    if (control.hasError('pattern')) {
      if (name === 'telefono') {
        return 'Introduce un número de teléfono válido (9-10 dígitos)';
      }
      return 'Formato incorrecto';
    }

    if (control.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }

    if (control.hasError('weakPassword')) {
      return 'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales';
    }

    return '';
  }
}
