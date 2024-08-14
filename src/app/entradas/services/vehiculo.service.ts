import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../interfaces/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/vehicles';

  constructor(private http: HttpClient) {}

  registerVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vehicle);
  }

  updateVehicle(id: string, vehicle: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAllVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  searchVehicle(query: { id?: string }): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/search', { params: query });
  }
}
