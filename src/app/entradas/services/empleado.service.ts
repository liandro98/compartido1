import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from '../interfaces/empleado';
import { environments } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) {}

  // Agregar un nuevo trabajador
  addTrabajador(newTrabajador: Empleado): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/trabajadores`, newTrabajador)
      .pipe(
        catchError((error) => {
          console.error('Error al agregar trabajador:', error);
          return of(undefined as any);
        })
      );
  }

  // Obtener todos los trabajadores
  getTrabajadores(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(`${this.baseUrl}/trabajadores`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener trabajadores:', error);
          return of([]);
        })
      );
  }

  // Obtener un trabajador por ID
  getTrabajador(idEmpleado: number): Observable<Empleado> {
    return this.httpClient.get<Empleado>(`${this.baseUrl}/trabajadores/${idEmpleado}`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener trabajador:', error);
          return of(undefined as any);
        })
      );
  }

  // Actualizar un trabajador
  updateTrabajador(idEmpleado: number, updatedTrabajador: Empleado): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/trabajadores/${idEmpleado}`, updatedTrabajador)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar trabajador:', error);
          return of(undefined as any);
        })
      );
  }

  // Eliminar un trabajador
  deleteTrabajador(idEmpleado: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/trabajadores/${idEmpleado}`)
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar trabajador:', error);
          return of(undefined as any);
        })
      );
  }
}