import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfilpage',
  templateUrl: './perfilpage.component.html',
  styles: 
  `
  body{
    margin: 10px;
    align-items: center;
    display: flex;
    flex-direction: column;
}
.container{
    margin: 10px;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 70%;
}

.elements{
    display: flex;
    gap: 20px;
    margin:30px;
}

.card-into{
    padding: 10px;
    border-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.span-label{
    height: max-content;
}

.data{
    display:flex; 
    flex-direction: row; 
    gap: 10px;
    border-radius: 5px;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    width: 100%;
}
  `
})
export class PerfilpageComponent {

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
