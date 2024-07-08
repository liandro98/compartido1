import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registropage',
  templateUrl: './registropage.component.html',
  styles: ``
})
export class RegistropageComponent {

  showLoginForm = false; 
  email: string = '';
  password: string = '';



  constructor(private router: Router) { }

  openLoginForm() {
    this.showLoginForm = true;
  }

  // Function to close the login form
  closeLoginForm() {
    this.showLoginForm = false;
  }

  entrar() {
    // Aquí puedes implementar lógica para determinar a dónde redirigir en función del tipo de usuario, correo electrónico, etc.
    // Por ejemplo, redirigir a diferentes rutas según el correo electrónico
    if (this.email === 'admin@utng.com') {
      this.router.navigate(['/admin/registro']); // Redirige al dashboard del administrador
    } else {
      this.router.navigate(['/entradas/list']); // Redirige al dashboard del usuario normal
    }
  }

  forgotPassword() {
    this.router.navigate(['/auth/recovery']);
  }

  onSubmit() {
    console.log('Iniciar sesión con', this.email, this.password);
    this.entrar();
  }

}
