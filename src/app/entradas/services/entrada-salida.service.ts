import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EntradaSalida } from '../interfaces/entrada-salida'; 
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EntradaSalidaService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getEntradasSalidas(fecha:string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/entradas-salidas/${fecha}`)
      .pipe(catchError(() => of([])));
  }

  getEntradaSalidaById(id: number): Observable<EntradaSalida | undefined> {
    return this.httpClient.get<EntradaSalida>(`${this.baseUrl}/entradas-salidas/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addEntradaSalida(entradaSalida: EntradaSalida): Observable<EntradaSalida> {
    return this.httpClient.post<EntradaSalida>(`${this.baseUrl}/entradas-salidas`, entradaSalida)
      .pipe(catchError(() => of(undefined as any)));
  }

  updateEntradaSalida(idEntradaSalida:number): Observable<EntradaSalida> {
    return this.httpClient.put<EntradaSalida>(`${this.baseUrl}/entradas-salidas/${idEntradaSalida}`,{})
      .pipe(catchError(() => of(undefined as any)));
  }

  deleteEntradaSalidaById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/entradas-salidas/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
