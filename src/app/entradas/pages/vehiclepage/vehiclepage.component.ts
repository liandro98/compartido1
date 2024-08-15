import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehiculo.service'; 
import { Vehicle } from '../../interfaces/vehiculo';

@Component({
  selector: 'app-vehiclepage',
  templateUrl: './vehiclepage.component.html',
  styles: [`
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 8px;
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    mat-card {
      width: 100%;
      padding: 20px;
      background-color: white;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
    .button-container {
      text-align: center;
      margin-top: 20px;
    }
  `]
})
export class VehiclepageComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleId: string = ''; // Para actualizar y eliminar vehículos
  selectedVehicleType: string = '';

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      vehicleType: [''],
      brand: [''],
      model: [''],
      licensePlate: [''],
      color: [''],
      description: [''],
      registrationDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Any initialization logic
    this.onVehicleTypeChange(this.vehicleForm.get('vehicleType')?.value);
  }

  onVehicleTypeChange(type: string): void {
    this.selectedVehicleType = type;
    if (type === 'bicycle') {
      this.vehicleForm.get('description')?.setValidators([Validators.required]);
    } else {
      this.vehicleForm.get('description')?.clearValidators();
    }
    this.vehicleForm.get('description')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData: Vehicle = this.vehicleForm.value;
      if (this.vehicleId) {
        this.vehicleService.updateVehicle(this.vehicleId, formData).subscribe(
          response => {
            console.log('Actualización exitosa:', response);
            alert('Vehículo actualizado');
            this.vehicleId = ''; // Limpiar ID después de la actualización
            this.vehicleForm.reset(); // Limpiar el formulario
          },
          error => {
            console.error('Error al actualizar vehículo:', error);
            alert('Error al actualizar vehículo');
          }
        );
      } else {
        this.vehicleService.registerVehicle(formData).subscribe(
          response => {
            console.log('Registro exitoso:', response);
            alert('Vehículo registrado');
            this.vehicleForm.reset(); // Limpiar el formulario después del registro
          },
          error => {
            console.error('Error al registrar vehículo:', error);
            alert('Error al registrar vehículo');
          }
        );
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  onDelete(): void {
    if (this.vehicleId) {
      this.vehicleService.deleteVehicle(this.vehicleId).subscribe(
        response => {
          console.log('Eliminación exitosa:', response);
          alert('Vehículo eliminado');
          this.vehicleId = ''; // Limpiar ID después de la eliminación
          this.vehicleForm.reset(); // Limpiar el formulario
        },
        error => {
          console.error('Error al eliminar vehículo:', error);
          alert('Error al eliminar vehículo');
        }
      );
    } else {
      alert('ID de vehículo no especificado.');
    }
  }

  populateForm(vehicle: Vehicle): void {
    this.vehicleForm.patchValue({
      vehicleType: vehicle.vehicleType || '',
      brand: vehicle.brand || '',
      model: vehicle.model || '',
      licensePlate: vehicle.licensePlate || '',
      color: vehicle.color || '',
      description: vehicle.description || '',
      registrationDate: vehicle.registrationDate || ''
    });

    this.vehicleId = vehicle.id || '';
    this.onVehicleTypeChange(vehicle.vehicleType);
  }
}
