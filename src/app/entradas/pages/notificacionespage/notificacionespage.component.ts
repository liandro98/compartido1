import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Notification {
  title: string;
  message: string;
  date: Date;
}
@Component({
  selector: 'app-notificacionespage',
  templateUrl: './notificacionespage.component.html',
  styles: ``
})
export class NotificacionespageComponent implements OnInit{

    notifications: Notification[] = [];
  
    ngOnInit(): void {
      // Simulación de notificaciones de reportes
      this.notifications = [
        { title: 'Reporte Diario', message: 'El reporte diario ha sido generado.', date: new Date() },
        { title: 'Reporte Semanal', message: 'El reporte semanal está disponible.', date: new Date() },
        { title: 'Error en Reporte', message: 'Hubo un error al generar el reporte mensual.', date: new Date() }
      ];
    }

}

