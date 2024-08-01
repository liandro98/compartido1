import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Politica } from '../interfaces/politica';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PoliticaService {
  private baseUrl: string = environments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getPoliticas(): Observable<Politica[]> {
    return this.httpClient.get<Politica[]>(`${this.baseUrl}/politicas`)
      .pipe(catchError(() => of([])));
  }

  getPoliticaById(id: number): Observable<Politica | undefined> {
    return this.httpClient.get<Politica>(`${this.baseUrl}/politicas/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  addPolitica(politica: Politica): Observable<Politica> {
    return this.httpClient.post<Politica>(`${this.baseUrl}/politicas`, politica)
      .pipe(catchError(() => of(undefined as any)));
  }

  updatePolitica(politica: Politica): Observable<Politica> {
    return this.httpClient.put<Politica>(`${this.baseUrl}/politicas/${politica.idPolitica}`, politica)
      .pipe(catchError(() => of(undefined as any)));
  }

  deletePoliticaById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/politicas/${id}`)
      .pipe(catchError(() => of(false)), map(() => true));
  }
}
