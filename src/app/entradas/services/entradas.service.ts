import { Injectable } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Usuario, Empleado, Estudiante, Profesor, Vehiculo, EntradaSalida, Reclamacion, Reporte, Notificacion, Politica } from '../interfaces/entradas.interface';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private httpClient: HttpClient) { }

  // Métodos para Usuario
  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/usuarios/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.baseUrl}/usuarios`, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.baseUrl}/usuarios/${usuario.idUsuario}`, usuario);
  }

  deleteUsuarioById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/usuarios/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para Empleado
  getEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(`${this.baseUrl}/empleados`);
  }

  getEmpleadoById(id: number): Observable<Empleado | undefined> {
    return this.httpClient.get<Empleado>(`${this.baseUrl}/empleados/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.post<Empleado>(`${this.baseUrl}/empleados`, empleado);
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.httpClient.put<Empleado>(`${this.baseUrl}/empleados/${empleado.idEmpleado}`, empleado);
  }

  deleteEmpleadoById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/empleados/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para Estudiante
  getEstudiantes(): Observable<Estudiante[]> {
    return this.httpClient.get<Estudiante[]>(`${this.baseUrl}/estudiantes`);
  }

  getEstudianteById(id: number): Observable<Estudiante | undefined> {
    return this.httpClient.get<Estudiante>(`${this.baseUrl}/estudiantes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient.post<Estudiante>(`${this.baseUrl}/estudiantes`, estudiante);
  }

  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.httpClient.put<Estudiante>(`${this.baseUrl}/estudiantes/${estudiante.idEstudiante}`, estudiante);
  }

  deleteEstudianteById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/estudiantes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para Profesor
  getProfesores(): Observable<Profesor[]> {
    return this.httpClient.get<Profesor[]>(`${this.baseUrl}/profesores`);
  }

  getProfesorById(id: number): Observable<Profesor | undefined> {
    return this.httpClient.get<Profesor>(`${this.baseUrl}/profesores/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addProfesor(profesor: Profesor): Observable<Profesor> {
    return this.httpClient.post<Profesor>(`${this.baseUrl}/profesores`, profesor);
  }

  updateProfesor(profesor: Profesor): Observable<Profesor> {
    return this.httpClient.put<Profesor>(`${this.baseUrl}/profesores/${profesor.idProfesor}`, profesor);
  }

  deleteProfesorById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/profesores/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para Vehiculo
  getVehiculos(): Observable<Vehiculo[]> {
    return this.httpClient.get<Vehiculo[]>(`${this.baseUrl}/vehiculos`);
  }

  getVehiculoById(id: number): Observable<Vehiculo | undefined> {
    return this.httpClient.get<Vehiculo>(`${this.baseUrl}/vehiculos/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.httpClient.post<Vehiculo>(`${this.baseUrl}/vehiculos`, vehiculo);
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.httpClient.put<Vehiculo>(`${this.baseUrl}/vehiculos/${vehiculo.idVehiculo}`, vehiculo);
  }

  deleteVehiculoById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/vehiculos/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para EntradaSalida
  getEntradasSalidas(): Observable<EntradaSalida[]> {
    return this.httpClient.get<EntradaSalida[]>(`${this.baseUrl}/entradas-salidas`);
  }

  getEntradaSalidaById(id: number): Observable<EntradaSalida | undefined> {
    return this.httpClient.get<EntradaSalida>(`${this.baseUrl}/entradas-salidas/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addEntradaSalida(entradaSalida: EntradaSalida): Observable<EntradaSalida> {
    return this.httpClient.post<EntradaSalida>(`${this.baseUrl}/entradas-salidas`, entradaSalida);
  }

  updateEntradaSalida(entradaSalida: EntradaSalida): Observable<EntradaSalida> {
    return this.httpClient.put<EntradaSalida>(`${this.baseUrl}/entradas-salidas/${entradaSalida.idEntradaSalida}`, entradaSalida);
  }

  deleteEntradaSalidaById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/entradas-salidas/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para Reclamacion
  getReclamaciones(): Observable<Reclamacion[]> {
    return this.httpClient.get<Reclamacion[]>(`${this.baseUrl}/reclamaciones`);
  }

  getReclamacionById(id: number): Observable<Reclamacion | undefined> {
    return this.httpClient.get<Reclamacion>(`${this.baseUrl}/reclamaciones/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addReclamacion(reclamacion: Reclamacion): Observable<Reclamacion> {
    return this.httpClient.post<Reclamacion>(`${this.baseUrl}/reclamaciones`, reclamacion);
  }

  updateReclamacion(reclamacion: Reclamacion): Observable<Reclamacion> {
    return this.httpClient.put<Reclamacion>(`${this.baseUrl}/reclamaciones/${reclamacion.idReclamacion}`, reclamacion);
  }

  deleteReclamacionById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/reclamaciones/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );
  }

  // Métodos para Reporte
  getReportes(): Observable<Reporte[]> {
    return this.httpClient.get<Reporte[]>(`${this.baseUrl}/reportes`);
  }

  getReporteById(id: number): Observable<Reporte | undefined> {
    return this.httpClient.get<Reporte>(`${this.baseUrl}/reportes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  addReporte(reporte: Reporte): Observable<Reporte> {
    return this.httpClient.post<Reporte>(`${this.baseUrl}/reportes`, reporte);
  }

  updateReporte(reporte: Reporte): Observable<Reporte> {
    return this.httpClient.put<Reporte>(`${this.baseUrl}/reportes/${reporte.idReporte}`, reporte);
  }

  deleteReporteById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/reportes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map(resp => true)
      );

  

    }
    // Métodos para Notificaciones
  getNotificaciones(): Observable<Notificacion[]> {
    return this.httpClient.get<Notificacion[]>(`${this.baseUrl}/notificaciones`)
      .pipe(catchError(error => of([]))); // Manejo básico de errores
  }

  getNotificacionById(id: number): Observable<Notificacion | undefined> {
    return this.httpClient.get<Notificacion>(`${this.baseUrl}/notificaciones/${id}`)
      .pipe(catchError(error => of(undefined)));
  }

  addNotificacion(notificacion: Notificacion): Observable<Notificacion> {
    return this.httpClient.post<Notificacion>(`${this.baseUrl}/notificaciones`, notificacion)
      .pipe(catchError(error => of(undefined as any)));
  }

  updateNotificacion(notificacion: Notificacion): Observable<Notificacion> {
    return this.httpClient.put<Notificacion>(`${this.baseUrl}/notificaciones/${notificacion.idNotificacion}`, notificacion)
      .pipe(catchError(error => of(undefined as any)));
  }

  deleteNotificacionById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/notificaciones/${id}`)
      .pipe(
        catchError(() => of(false)),
        map(() => true)
      );
  }

  // Métodos para Politicas
  getPoliticas(): Observable<Politica[]> {
    return this.httpClient.get<Politica[]>(`${this.baseUrl}/politicas`)
      .pipe(catchError(error => of([])));
  }

  getPoliticaById(id: number): Observable<Politica | undefined> {
    return this.httpClient.get<Politica>(`${this.baseUrl}/politicas/${id}`)
      .pipe(catchError(error => of(undefined)));
  }

  addPolitica(politica: Politica): Observable<Politica> {
    return this.httpClient.post<Politica>(`${this.baseUrl}/politicas`, politica)
      .pipe(catchError(error => of(undefined as any)));
  }

  updatePolitica(politica: Politica): Observable<Politica> {
    return this.httpClient.put<Politica>(`${this.baseUrl}/politicas/${politica.idPolitica}`, politica)
      .pipe(catchError(error => of(undefined as any)));
  }

  deletePoliticaById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/politicas/${id}`)
      .pipe(
        catchError(() => of(false)),
        map(() => true)
      );
  }
}
