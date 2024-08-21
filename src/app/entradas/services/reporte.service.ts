import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { reporte } from '../interfaces/reporte'; // Asegúrate de importar la interfaz correctamente

@Injectable({
  providedIn: 'root'
})
export class reporteService {

  private apiUrl = 'http://localhost:3000/reportes'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) { }

  generarReporte(reporte: reporte): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, reporte);
  }

  exportarPDF(reporteId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/exportar/pdf/${reporteId}`, { responseType: 'blob' });
  }

 
}
