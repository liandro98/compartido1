// interfaces.ts

// Enumeraciones para tipos de usuario
export enum TipoUsuario {
    Empleado = "Empleado",
    Estudiante = "Estudiante",
    Profesor = "Profesor"
}

// Enumeraciones para estados de reclamaciones
export enum EstadoReclamacion {
    Pendiente = "Pendiente",
    Resuelto = "Resuelto",
    Rechazado = "Rechazado"
}

// Enumeraciones para permisos
export enum NombrePermiso {
    Leer = "Leer",
    Escribir = "Escribir",
    Administrar = "Administrar"
}

// Interfaz para Usuario
export interface Usuario {
    idUsuario: number;
    Nombre: string;
    CorreoElectronico: string;
    Contrasena: string; // En una aplicación real, este debería estar encriptado
    TipoUsuario: TipoUsuario;
}

// Interfaz para Rol
export interface Rol {
    idRol: number;
    NombreRol: string;
}

// Interfaz para Empleado
export interface Empleado {
    idEmpleado: number;
    idUsuario: number;
    Cargo: string;
    idRol: number;
}

// Interfaz para Administrador
export interface Administrador {
    idAdministrador: number;
    idEmpleado: number;
}

// Interfaz para Estudiante
export interface Estudiante {
    idEstudiante: number;
    idUsuario: number;
    Carrera: string;
    NumeroControlEscolar: string;
}

// Interfaz para Profesor
export interface Profesor {
    idProfesor: number;
    idUsuario: number;
    Departamento: string;
}

// Interfaz para Permiso
export interface Permiso {
    idPermiso: number;
    NombrePermiso: NombrePermiso;
}

// Interfaz para RolPermiso
export interface RolPermiso {
    idRol: number;
    idPermiso: number;
}

// Interfaz para Sesion
export interface Sesion {
    idSesion: number;
    idUsuario: number;
    FechaHoraInicio: string; // Utiliza ISO 8601 formato para fechas
    FechaHoraFin?: string;
    DireccionIP: string;
}

// Interfaz para Reclamacion
export interface Reclamacion {
    idReclamacion: number;
    idUsuario: number;
    Categoria: string;
    Fecha: string; // Utiliza ISO 8601 formato para fechas
    Estado: EstadoReclamacion;
    Comentarios?: string;
}

// Interfaz para Reporte
export interface Reporte {
    idReporte: number;
    idUsuario: number;
    Fecha: string; // Utiliza ISO 8601 formato para fechas
    Contenido: string;
}

// Interfaz para Notificacion
export interface Notificacion {
    idNotificacion: number;
    idUsuario: number;
    FechaHora: string; // Utiliza ISO 8601 formato para fechas
    Mensaje: string;
}

// Interfaz para Politica
export interface Politica {
    idPolitica: number;
    Descripcion: string;
    FechaActualizacion: string; // Utiliza ISO 8601 formato para fechas
}

// Interfaz para Vehiculo
export interface Vehiculo {
    idVehiculo: number;
    Placa: string;
    Marca: string;
    Modelo: string;
    Descripcion?: string;
}

// Interfaz para EntradaSalida
export interface EntradaSalida {
    idEntradaSalida: number;
    idVehiculo: number;
    idUsuario: number;
    HoraEntrada: string; // Utiliza ISO 8601 formato para fechas
    HoraSalida?: string;
}
