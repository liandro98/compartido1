import { Component } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styles: ``
})
export class StartpageComponent {

  public sidebarItems = [
    {label:'Listado', icon:'label',url:'./entrada'},
    {label:'Añadir',icon:'add', url:'./roles'},
    {label:'Buscar', icon:'search', url:'./reportes'},
    {label:'heroe',icon:'label',url:"./politicas"}
  ]
  
}
