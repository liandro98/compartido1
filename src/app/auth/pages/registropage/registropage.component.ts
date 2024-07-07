import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registropage',
  templateUrl: './registropage.component.html',
  styles: ``
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
    this.router.navigate(['/entradas/']);
  }

  forgotPassword() {
    this.router.navigate(['/auth/recovery']);
  }

  onSubmit() {
    console.log('Iniciar sesión con', this.email, this.password);
    this.entrar();
  }

}
