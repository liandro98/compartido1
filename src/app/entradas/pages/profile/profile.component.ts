import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  persona = {
    name: "Juan",
    image: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
    correo: "juanvanessa@gmail.com",
    telefono: "41181105645",
    genero: "mujer",
    pais: "Mexico"
  };

  constructor(private router: Router) {}

  navigateToRecovery() {
    this.router.navigate(['admin/changeP']);
  }
}
