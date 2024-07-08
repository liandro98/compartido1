import { Component } from '@angular/core';

@Component({
  selector: 'app-layoutpage',
  templateUrl: './layoutpage.component.html',
  styles: ``
})
export class LayoutpageComponent {
  public sidebarItems = [
    {label:'registro', icon:'add',url:'./registro'},
    {label:'permisos', icon:'list',url:'./permisos'},
    {label:'cerrar session',icon:'logout',url: "/auth/"}
  ]
  
  openUserMenu() {
    // Implement your user menu logic here
    console.log("User icon clicked");
  }

  openHelp() {
    // Implement your help logic here
    console.log("Help icon clicked");
  }

  openNotifications() {
    // Implement your notifications logic here
    console.log("Notifications icon clicked");
  }
  
}
