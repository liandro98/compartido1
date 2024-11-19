import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../entradas/services/usuario.service';
import { Log } from '../../../entradas/interfaces/log';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styles: ''
})
export class ManualComponent {
  logForm: FormGroup;
  showLoginForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.logForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  openLoginForm() {
    this.showLoginForm = true;
  }

  closeLoginForm() {
    this.showLoginForm = false;
  }

  entrar() {
    if (this.logForm.invalid) {
      this.showValidationErrors();
      return;
    }

    const { email: user, password: contrasena } = this.logForm.value;

    this.userService.validateUser(user, contrasena).subscribe(
      (res: Log) => {
        console.log(res);
        sessionStorage.setItem('user', JSON.stringify(res['user']));
        if (res.TipoUsuario === 'Administrador') {
          this.router.navigate(['/admin/registro']);
          this.snackBar.open('Bienvenido Administrador!', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
        } else if (res.TipoUsuario === 'Empleado') {
          this.router.navigate(['/entradas/list']);
          this.snackBar.open('Bienvenido Empleado!', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
        } else {
          this.router.navigate(['/entradas/perfil']);
          this.snackBar.open('Bienvenido Usuario!', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.handleLoginError(error);
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['/auth/recovery']);
  }

  onSubmit() {
    this.entrar();
  }

  showValidationErrors(): void {
    const emailControl = this.logForm.get('email');
    const passwordControl = this.logForm.get('password');
    const errorMessages: string[] = [];

    if (emailControl?.invalid) {
      if (emailControl.hasError('required')) {
        errorMessages.push('El correo electrónico es requerido.');
      } else if (emailControl.hasError('email')) {
        errorMessages.push('El correo electrónico debe ser válido.');
      }
    }

    if (passwordControl?.invalid) {
      if (passwordControl.hasError('required')) {
        errorMessages.push('La contraseña es requerida.');
      }
    }

    if (errorMessages.length > 0) {
      this.snackBar.open(errorMessages.join(' '), 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }

  handleLoginError(error: any): void {
    if (error.status === 401) { // Suponiendo que 401 es para errores de autenticación
      if (error.error === 'email') {
        this.snackBar.open('Correo electrónico incorrecto.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      } else if (error.error === 'password') {
        this.snackBar.open('Contraseña incorrecta.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      } else {
        this.snackBar.open('Error en el inicio de sesión. Por favor, intente nuevamente.', 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    } else {
      this.snackBar.open('Error en el inicio de sesión. Por favor, intente nuevamente.', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }

  // API Redes sociales
  videos: any[] = [];


  ngOnInit(): void {
    this.userService.getVideos('angular').subscribe((data) => {
      this.videos = data.items; // Guardamos los videos en el array
    });
  }
}
