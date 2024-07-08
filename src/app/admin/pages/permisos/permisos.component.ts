import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styles: 
  `
  /* permissions.component.css */

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
export class PermisosComponent {

  permissionsForm: FormGroup;
  users: any[] = [
    { id: 1, name: 'Usuario A' },
    { id: 2, name: 'Usuario B' },
    { id: 3, name: 'Usuario C' }
    // Agrega más usuarios según sea necesario
  ];

  constructor(private fb: FormBuilder) {
    this.permissionsForm = this.fb.group({
      selectedUser: ['1'], // Valor inicial, puede ser el primer usuario por defecto
      canViewDashboard: [false],
      canManageUsers: [false],
      canEditContent: [false],
      canEnter: [false], // Permiso para ingresar
      canExit: [false], // Permiso para salir
      canManageMovements: [false] // Permiso para administrar movimientos
      // Agrega más permisos según sea necesario
    });
  }

  onSubmit(): void {
    if (this.permissionsForm.valid) {
      const userId = this.permissionsForm.get('selectedUser')!.value;
      // Aquí puedes enviar los datos de permisos a tu servicio de backend
      // para guardarlos en la base de datos o aplicarlos en la lógica de tu aplicación
      console.log('Permisos guardados para el usuario con ID:', userId);
      // Podrías agregar una lógica adicional, como mostrar un mensaje de éxito o redirigir a otra página
    } else {
      console.error('Por favor completa el formulario correctamente.');
    }
  }
  
  
}
