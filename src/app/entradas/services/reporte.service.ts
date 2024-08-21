import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from '../../../environments/environments';
import { Reporte } from '../interfaces/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getReportes(): Observable<Reporte[]> {
    return this.httpClient.get<Reporte[]>(`${this.baseUrl}/reportes`)
      .pipe(catchError(() => of([])));
  }

  getReporteById(id: number): Observable<Reporte | undefined> {
    return this.httpClient.get<Reporte>(`${this.baseUrl}/reportes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addReporte(reporte: Reporte): Observable<Reporte> {
    return this.httpClient.post<Reporte>(`${this.baseUrl}/reportes`, reporte)
      .pipe(catchError(() => of(undefined as any)));
  }

  updateReporte(reporte: Reporte): Observable<Reporte> {
    return this.httpClient.put<Reporte>(`${this.baseUrl}/reportes/${reporte.idReporte}`, reporte)
      .pipe(catchError(() => of(undefined as any)));
  }

  deleteReporteById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/reportes/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
