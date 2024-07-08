import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addwpage',
  templateUrl: './addwpage.component.html',
  styles:
   `
   /* registropage.component.css */

.container {
  margin-top: 20px;
}

.full-width {
  width: 100%;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

   `
})
export class AddwpageComponent {
  
  workerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.workerForm = this.fb.group({
      employeeId: ['', Validators.required], // Clave del trabajador
      fullName: ['', Validators.required], // Nombre completo
      email: ['', [Validators.required, Validators.email]], // Correo electrónico
      birthDate: ['', Validators.required], // Fecha de nacimiento
      department: ['', Validators.required], // Departamento
      position: ['', Validators.required], // Puesto
      barcode: ['', Validators.required] // Código de barras
    });
  }

  onSubmit(): void {
    if (this.workerForm.valid) {
      console.log('Formulario enviado:', this.workerForm.value);
      // Aquí agregarías la lógica para enviar los datos a tu servicio de backend
      // y manejar la respuesta adecuadamente (por ejemplo, mostrar un mensaje de éxito)
      // Después de registrar al trabajador, podrías redirigir a alguna otra página
      this.router.navigate(['/dashboard']); // Cambia '/dashboard' por la ruta adecuada
    } else {
      console.error('Por favor completa el formulario correctamente.');
    }
  }
}
