import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recoverypage',
  templateUrl: './password-recoverypage.component.html',
  styles: 
  `
  body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

mat-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

  `
})
export class PasswordRecoverypageComponent {
  email: string= '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aquí iría la lógica para enviar el correo
    this.router.navigate(['/auth/verification']);
  }

}
