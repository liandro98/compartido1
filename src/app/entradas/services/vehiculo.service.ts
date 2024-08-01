import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from '../../../environments/environments';
import { Vehiculo } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.httpClient.get<Vehiculo[]>(`${this.baseUrl}/vehiculos`)
      .pipe(catchError(() => of([])));
  }

  getVehiculoById(id: number): Observable<Vehiculo | undefined> {
    return this.httpClient.get<Vehiculo>(`${this.baseUrl}/vehiculos/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.httpClient.post<Vehiculo>(`${this.baseUrl}/vehiculos`, vehiculo)
      .pipe(catchError(() => of(undefined as any)));
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.httpClient.put<Vehiculo>(`${this.baseUrl}/vehiculos/${vehiculo.idVehiculo}`, vehiculo)
      .pipe(catchError(() => of(undefined as any)));
  }

  deleteVehiculoById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/vehiculos/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
