import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Empleado } from '../interfaces/empleado'; 
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(`${this.baseUrl}/empleados`)
      .pipe(catchError(() => of([])));
  }

  getEmpleadoById(id: number): Observable<Empleado | undefined> {
    return this.httpClient.get<Empleado>(`${this.baseUrl}/empleados/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.post<Empleado>(`${this.baseUrl}/empleados`, empleado)
      .pipe(catchError(() => of(undefined as any)));
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(`${this.baseUrl}/empleados/${empleado.idEmpleado}`, empleado)
      .pipe(catchError(() => of(undefined as any)));
  }

  deleteEmpleadoById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/empleados/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
