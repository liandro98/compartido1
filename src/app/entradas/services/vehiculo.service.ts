// vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Vehiculo } from '../interfaces/vehiculo'; 

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = 'http://localhost:3000/vehicleRoutes'; // Adjust URL if needed

  constructor(private http: HttpClient) { }

  addVehicle(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.baseUrl}/add`, vehiculo).pipe(
      catchError((error) => {
        console.error('Error al insertar el vehículo:', error);
        return throwError(error);
      })
    );
  }
 
  updateVehicle(id: number, vehicle: Vehiculo): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.baseUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  getAllVehicles(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.baseUrl);
  }

  getVehicleById(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.baseUrl}/${id}`);
  }
}
