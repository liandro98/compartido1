import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../../entradas/services/usuario.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-passnewpage',
  templateUrl: './passnewpage.component.html',
  styles: [`/* Agrega estilos aquí si es necesario */`]
})
export class PassnewpageComponent implements OnInit {
  changePasswordForm: FormGroup;
  usuario: any; // Ejemplo de información de usuario

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtén el usuario de la sesión
    this.usuario = JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return; // Maneja la validación del formulario
    }

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      // Maneja el caso en el que las contraseñas no coinciden
      alert('Las contraseñas nuevas no coinciden');
      return;
    }

    this.changePassword(currentPassword, newPassword);
  }

  changePassword(currentPassword: string, newPassword: string) {
    // Asegúrate de que el correo esté definido en la sesión
    const email = this.usuario?.user;

    if (!email) {
      alert('No se encontró el correo del usuario');
      return;
    }

    this.userService.changePassword(email, currentPassword, newPassword).subscribe(
      response => {
        console.log('Contraseña cambiada con éxito', response);
        // Redirige o muestra un mensaje de éxito
        this.router.navigate(['/admin/confnp']); // Redirige a la página deseada
      },
      error => {
        console.error('Error al cambiar la contraseña', error);
        // Maneja el error y muestra un mensaje apropiado
        alert('Error al cambiar la contraseña');
      }
    );
  }
}
