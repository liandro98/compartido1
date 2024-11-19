import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../entradas/services/usuario.service';
import { Log } from '../../../entradas/interfaces/log';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ''
})
export class HomeComponent {
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

  private map: L.Map | undefined;

  ngOnInit(): void {
    this.initMap();
    //this.locateUser()
  }

  // Api de Geolocalizacion
  private initMap(): void {
    // Configura el mapa
    this.map = L.map('map').setView([21.167399, -100.930821], 14); // Coordenadas iniciales

    // Agrega los mosaicos del mapa (en este caso OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    // Agrega un marcador
    L.marker([21.167399, -100.930821])
      .addTo(this.map)
      .bindPopup('Hola estamos aqui!!')
      .openPopup();
  }

  // Limpia el mapa al destruir el componente
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  // Unbicar usario en el mapa en mantenimiento
  /*
  private locateUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: L.LatLngTuple = [position.coords.latitude, position.coords.longitude]; // Asegura que es un LatLngTuple
          this.map?.setView(coords, 14); // Centra el mapa en la ubicación del usuario
  
          L.marker(coords) // Usa coords aquí sin problemas
            .addTo(this.map!)
            .bindPopup('¡Estás aquí!')
            .openPopup();
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
        }
      );
    } else {
      console.error('Geolocalización no soportada en este navegador.');
    }
  }
  */
}
