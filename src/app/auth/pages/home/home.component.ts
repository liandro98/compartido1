import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../entradas/services/usuario.service';
import { Log } from '../../../entradas/interfaces/log';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

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
  private currentMaker?: L.Marker
  private markers: L.Marker[] = [];

  ngOnInit(): void {
    this.initMap();
    this.locateUser()
  }

  // Api de Geolocalizacion
  private initMap(): void {
    // Configura el mapa
    this.map = L.map('map').setView([21.167399, -100.930821], 14); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // Atribucion a OpenStreetMaps
      maxZoom: 18
    }).addTo(this.map);

    // Agrega marcadores
    this.markers = [
      L.marker([21.169999, -100.930000]).bindPopup('Estacionamiento 1').addTo(this.map).openPopup(),
      L.marker([21.165000, -100.935000]).bindPopup('Estacionamiento 1').addTo(this.map).openPopup(),
      L.marker([21.170000, -100.940000]).bindPopup('Estacionamiento 1').addTo(this.map).openPopup()
    ];
  }

  private locateUser(): void {
    if (!this.map) return;

    // Obteniendo ubicacion actual con l API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        const currentLocation = [latitude, longitude] as [number, number];  

        // Agrega un marcador de la posicion actual
        this.currentMaker = L.marker(currentLocation).addTo(this.map!).bindPopup('Usted se encuentra aqui').openPopup();

        // Ajuste en la vista para incluir la posicion
        this.map?.setView(currentLocation);

        // Cacular la de la ruta actual a los marcadores
        this.calculateRoute(currentLocation);
      },(error) => { // Manejo de errores
        window.alert('Ocurrio un error al obtener tu posicion, considera activar la ubicacion actual')
        console.log('Error al obtener posicion del usuario: ', error)
      }
    )
  }

  private calculateRoute(currentLocation: [number, number]): void {
    if(!this.map) return;

    // Leaflet Ruting Machine en uso
    const waypoints = [L.latLng(...currentLocation), ...this.markers.map(maker => maker.getLatLng())]

    const routingControl = L.Routing.control({
      waypoints,
      routeWhileDragging: true,
      show: false, // Oculta el recuadro de direcciones
    });

    routingControl.addTo(this.map);

    // Oculta el panel de instrucciones (si se agrega por defecto)
    const container = routingControl.getContainer();
    if (container) {
      container.style.display = 'none';
    }
  }

  // Limpia el mapa al destruir el componente
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

 
}
