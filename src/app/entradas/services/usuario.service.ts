import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  validateUser(usr: string, cont: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', { user: usr, contrasena: cont });
  }

  registerUser(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  updateUser(id: string, usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchUser(query: { id?: string, name?: string }): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + '/search', { params: query });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  
  searchUserByBarcode(barcode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/barcode/${barcode}`,);
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(this.apiUrl+'/change-password', { email, oldPassword, newPassword });
  }

  // API de  You Tube
  private apiUrlY = 'https://www.googleapis.com/youtube/v3/search'; // URL base de la API de YouTube
  private apiKey = 'YOAIzaSyDZLwhZ402neFFxvznssADVcMH5-DmubN8'; // Sustituye por tu propia clave API

  // Método para obtener videos de YouTube
  getVideos(query: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('key', this.apiKey)
      .set('part', 'snippet')
      .set('maxResults', '5');  // Puedes modificar el número de resultados

    return this.http.get<any>(this.apiUrl, { params });
  }
}
