export interface Supplier {
  userType: 'Empleado' | 'Estudiante' | 'Profesor' | 'Proveedor';
  idUsuario?: string; // Ahora es opcional
  email?: string; // Ahora es opcional
  fullName?: string; // Ahora es opcional
  model: string;
  plates: string;
  companyName: string;
  providerName: string;
}
