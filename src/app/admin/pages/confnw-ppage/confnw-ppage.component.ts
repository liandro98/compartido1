import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confnw-ppage',
  templateUrl: './confnw-ppage.component.html',
  styles: ``
})
export class ConfnwPpageComponent {

  
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/registro']);
  }
  
  
}
