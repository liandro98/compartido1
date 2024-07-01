import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layoutpage',
  templateUrl: './layoutpage.component.html',
  styles: ``
  
})
export class LayoutpageComponent  {
  
  showLoginForm = false; // Variable to control the visibility of the login form

  // Function to open the login form
  openLoginForm() {
    this.showLoginForm = true;
  }

  // Function to close the login form
  closeLoginForm() {
    this.showLoginForm = false;
  }

  // Function to handle login logic
  login() {
    // Add your login logic here
  }
  
  constructor(private router: Router) { }

  // Función para redirigir a otra página al presionar el botón "Entrar"
  entrar() {
    // Aquí puedes especificar la ruta a la que deseas redirigir
    this.router.navigate(['/src/app/auth/pages/reportespage/reportespage.component.html']);
  }

}