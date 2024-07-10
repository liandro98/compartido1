import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passrecopage',
  templateUrl: './passrecopage.component.html',
  styles: 
  `
  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Esto centra el contenido verticalmente en la pantalla */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  width: 300px; /* Ajusta el ancho del formulario según tus necesidades */
}

  `
})
export class PassrecopageComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      const correo = this.loginForm.get('correo')!.value;
      const contrasena = this.loginForm.get('contrasena')!.value;

      // Lógica para autenticar al usuario utilizando el servicio de autenticación

    } else {
      console.error('Formulario no válido');
    }
  }
  onSubmit() {
    // Aquí iría la lógica para enviar el correo
    this.router.navigate(['/admin/newP']);
  }

}