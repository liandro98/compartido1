import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Estudiante } from '../interfaces/estudiante'; 
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getEstudiantes(): Observable<Estudiante[]> {
    return this.httpClient.get<Estudiante[]>(`${this.baseUrl}/estudiantes`)
      .pipe(catchError(() => of([])));
  }

  getEstudianteById(id: number): Observable<Estudiante | undefined> {
    return this.httpClient.get<Estudiante>(`${this.baseUrl}/estudiantes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient.post<Estudiante>(`${this.baseUrl}/estudiantes`, estudiante)
      .pipe(catchError(() => of(undefined as any)));
  }

  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient.put<Estudiante>(`${this.baseUrl}/estudiantes/${estudiante.idEstudiante}`, estudiante)
      .pipe(catchError(() => of(undefined as any)));
  }

  deleteEstudianteById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/estudiantes/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
