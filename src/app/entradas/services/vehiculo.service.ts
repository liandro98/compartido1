import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicleRoutes'; // Actualiza con la URL correcta

  constructor(private http: HttpClient) {}

  registerVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, vehicle);
  }

  updateVehicle(id: string, vehicle: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/unadd${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchVehicle(id: string): Observable<any[]> {
    const params = new HttpParams().set('id', id);
    return this.http.post<any[]>(`${this.apiUrl}/search`, { id });
  }
}
