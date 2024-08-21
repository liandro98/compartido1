import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../entradas/services/usuario.service';
import { Log } from '../../../entradas/interfaces/log'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-registropage',
  templateUrl: './registropage.component.html',
  styles: `` 
})
export class RegistropageComponent {

  logForm: FormGroup;
  showLoginForm = false; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
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
      // Manejo de errores de formulario
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const { email: user, password:contrasena } = this.logForm.value;

    this.userService.validateUser(user, contrasena).subscribe(
      (res: Log) => {
        console.log(res)
        sessionStorage.setItem('user', JSON.stringify(res['user']));
        if (res.TipoUsuario === 'Administrador') {
          this.router.navigate(['/admin/registro']); // Redirige al dashboard del administrador
        } else if (res.TipoUsuario === 'Empleado') {
          this.router.navigate(['/entradas/list']); // Redirige al dashboard del empleado
        } else {
          // Manejo de otros tipos de usuarios si aplica
          this.router.navigate(['/entradas/perfil']);
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Error en el inicio de sesión. Por favor, intente nuevamente.');
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['/auth/recovery']);
  }

  onSubmit() {
    console.log('Iniciar sesión con', this.logForm.value.email);
    this.entrar();
  }
}
