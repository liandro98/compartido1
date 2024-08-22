import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EmpleadoService } from '../../../entradas/services/empleado.service';
import { Empleado } from '../../../entradas/interfaces/empleado';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addwpage',
  templateUrl: './addwpage.component.html',
  styles: [`
    mat-card {
      max-width: 600px;
      margin: 20px auto;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .container {
      margin-top: 20px;
    }

    .full-width {
      width: 100%;
    }

    .button-container {
      text-align: center;
      margin-top: 20px;
    }
  `]
})
export class AddwpageComponent implements OnInit {
  workerForm: FormGroup;
  selectedEmployee: Empleado | null = null;
  workers: Empleado[] = []; // Lista de trabajadores

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadoService,
    private snackBar: MatSnackBar
  ) {
    this.workerForm = this.fb.group({
      employeeId: [''], // Clave del trabajador
      fullName: ['', [Validators.required, this.lettersAndSpacesValidator]], // Nombre completo
      email: ['', [Validators.required, Validators.email]], // Correo electrónico
      Contrasena: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]], // Contraseña
      department: ['', [Validators.required, this.lettersAndSpacesValidator]], // Departamento
      position: ['', [Validators.required, this.lettersAndSpacesValidator]] // Puesto
    });
  }

  ngOnInit(): void {
    this.getWorkers(); // Cargar los trabajadores al iniciar el componente
  }

  getWorkers(): void {
    this.empleadosService.getTrabajadores().subscribe(
      (res: Empleado[]) => {
        this.workers = res;
      },
      (err) => {
        console.error('Error al obtener trabajadores:', err);
        this.snackBar.open('Error al obtener trabajadores.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    );
  }

  onWorkerSelect(event: MatSelectChange): void {
    this.selectedEmployee = event.value as Empleado;
    this.workerForm.patchValue({
      employeeId: this.selectedEmployee.idEmpleado,
      fullName: this.selectedEmployee.Nombre,
      Contrasena: this.selectedEmployee.Contrasena,
      email: this.selectedEmployee.CorreoElectronico,
      department: this.selectedEmployee.Departamento,
      position: this.selectedEmployee.Cargo
    });
  }

  onSubmit(): void {
    if (this.workerForm.valid) {
      const formValue = this.workerForm.value;
      const empleado: Empleado = {
        idEmpleado: formValue.employeeId,
        Nombre: formValue.fullName,
        CorreoElectronico: formValue.email,
        Contrasena: formValue.Contrasena,
        Departamento: formValue.department,
        Cargo: formValue.position,
        idUsuario: 0
      };

      if (this.selectedEmployee) {
        // Actualizar empleado existente
        this.empleadosService.updateTrabajador(this.selectedEmployee.idEmpleado!, empleado).subscribe(
          (res) => {
            this.snackBar.open('Empleado actualizado exitosamente.', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
            this.resetForm();
          },
          (err) => {
            console.error('Error al actualizar empleado:', err);
            this.snackBar.open('Error al actualizar empleado.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
          }
        );
      } else {
        // Agregar nuevo empleado
        this.empleadosService.addTrabajador(empleado).subscribe(
          (res) => {
            this.snackBar.open('Empleado agregado exitosamente.', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
            this.resetForm();
          },
          (err) => {
            console.error('Error al agregar empleado:', err);
            this.snackBar.open('Error al agregar empleado.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
          }
        );
      }
    } else {
      this.snackBar.open('Por favor completa el formulario correctamente.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  }

  onDelete(): void {
    if (this.selectedEmployee) {
      this.empleadosService.deleteTrabajador(this.selectedEmployee.idEmpleado!).subscribe(
        (res) => {
          this.snackBar.open('Empleado eliminado exitosamente.', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
          this.resetForm();
        },
        (err) => {
          console.error('Error al eliminar empleado:', err);
          this.snackBar.open('Error al eliminar empleado.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.snackBar.open('Selecciona un empleado para eliminar.', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  }

  resetForm(): void {
    this.selectedEmployee = null;
    this.workerForm.reset();
    this.getWorkers();
  }

  // Validador personalizado para contraseñas
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) return null;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return isValid ? null : { weakPassword: true };
  }

  // Validador personalizado para solo letras y espacios
  lettersAndSpacesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;
    const isValid = /^[A-Za-z\s]+$/.test(value);
    return isValid ? null : { invalidFormat: true };
  }
}
