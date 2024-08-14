import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../entradas/services/empleado.service';
import { Empleado } from '../../../entradas/interfaces/empleado';
import { MatSelectChange } from '@angular/material/select';

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
    private empleadosService: EmpleadoService
  ) {
    this.workerForm = this.fb.group({
      employeeId: [''], // Clave del trabajador
      fullName: ['', Validators.required], // Nombre completo
      email: ['', [Validators.required, Validators.email]], // Correo electrónico
      Contrasena: ['', Validators.required], // Contraseña
      department: ['', Validators.required], // Departamento
      position: ['', Validators.required] // Puesto
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
      }
    );
  }

  onWorkerSelect(event: MatSelectChange): void {
    this.selectedEmployee = event.value as Empleado;
    this.workerForm.patchValue({
      employeeId: this.selectedEmployee.idEmpleado,
      fullName: this.selectedEmployee.Nombre,
      Contrasena:this.selectedEmployee.Contrasena,
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
            alert('Empleado actualizado exitosamente');
            this.resetForm();
          },
          (err) => {
            console.error('Error al actualizar empleado:', err);
            alert('Error al actualizar empleado');
          }
        );
      } else {
        // Agregar nuevo empleado
        this.empleadosService.addTrabajador(empleado).subscribe(
          (res) => {
            alert('Empleado agregado exitosamente');
            this.resetForm();
          },
          (err) => {
            console.error('Error al agregar empleado:', err);
            alert('Error al agregar empleado');
          }
        );
      }
    } else {
      alert('Por favor completa el formulario correctamente.');
    }
  }

  onDelete(): void {
    if (this.selectedEmployee) {
      this.empleadosService.deleteTrabajador(this.selectedEmployee.idEmpleado!).subscribe(
        (res) => {
          alert('Empleado eliminado exitosamente');
          this.resetForm();
        },
        (err) => {
          console.error('Error al eliminar empleado:', err);
          alert('Error al eliminar empleado');
        }
      );
    }
  }

  resetForm(): void {
    this.selectedEmployee = null;
    this.workerForm.reset();
    this.getWorkers()
  }
}
