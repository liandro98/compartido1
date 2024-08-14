export interface Empleado {
  idEmpleado?: number;          // Opcional, se generará automáticamente en la base de datos
  idUsuario: number;            // Necesario para la relación con la tabla Usuario
  Nombre: string;               // Nombre completo del empleado
  CorreoElectronico: string;    // Correo electrónico
  Contrasena: string;           // Contraseña
  Departamento: string;         // Departamento del empleado
  Cargo: string;                // Cargo del empleado
  // Puedes agregar más campos aquí si es necesario
}
