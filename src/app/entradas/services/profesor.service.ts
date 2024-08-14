import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from '../../../environments/environments';
import { Profesor } from '../interfaces/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getProfesores(): Observable<Profesor[]> {
    return this.httpClient.get<Profesor[]>(`${this.baseUrl}/profesores`)
      .pipe(catchError(() => of([])));
  }

  getProfesorById(id: number): Observable<Profesor | undefined> {
    return this.httpClient.get<Profesor>(`${this.baseUrl}/profesores/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addProfesor(profesor: Profesor): Observable<Profesor> {
    return this.httpClient.post<Profesor>(`${this.baseUrl}/profesores`, profesor)
      .pipe(catchError(() => of(undefined as any)));
  }

  updateProfesor(profesor: Profesor): Observable<Profesor> {
    return this.httpClient.put<Profesor>(`${this.baseUrl}/profesores/${profesor.idProfesor}`, profesor)
      .pipe(catchError(() => of(undefined as any)));
  }

  deleteProfesorById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/profesores/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
