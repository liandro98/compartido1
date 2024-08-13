import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../interfaces/supplier'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:3000/suplier'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  registerSupplier(supplier: Supplier): Observable<any> {
    return this.http.post<any>(this.apiUrl, supplier);
  }
}
