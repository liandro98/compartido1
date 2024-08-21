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
  vehicleId: string = '';
  selectedVehicleType: string = '';
  vehicles: Vehicle[] = [];  // Array to store vehicles

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      brand: [''],
      model: [''],
      licensePlate: [''],
      color: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadVehicles();  // Load vehicles on initialization
    this.onVehicleTypeChange();
  }

  onVehicleTypeChange(): void {
    const vehicleType = this.vehicleForm.value.vehicleType;
    this.selectedVehicleType = vehicleType;

    if (vehicleType === 'car') {
      this.vehicleForm.addControl('brand', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('model', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('licensePlate', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('color', this.fb.control('', Validators.required));
      this.vehicleForm.removeControl('description');
    } else if (vehicleType === 'motorcycle') {
      this.vehicleForm.addControl('brand', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('model', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('licensePlate', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('color', this.fb.control(''));
      this.vehicleForm.removeControl('description');
    } else if (vehicleType === 'bicycle') {
      this.vehicleForm.addControl('description', this.fb.control(''));
      this.vehicleForm.addControl('color', this.fb.control('', Validators.required));
      this.vehicleForm.removeControl('brand');
      this.vehicleForm.removeControl('model');
      this.vehicleForm.removeControl('licensePlate');
    }
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData: Vehicle = this.vehicleForm.value;
      if (this.vehicleId) {
        this.vehicleService.updateVehicle(this.vehicleId, formData).subscribe(
          response => {
            console.log('Actualización exitosa:', response);
            alert('Vehículo actualizado');
            this.resetForm();
            this.loadVehicles();  // Reload vehicles list after update
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
            this.resetForm();
            this.loadVehicles();  // Reload vehicles list after registration
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
          this.resetForm();
          this.loadVehicles();  // Reload vehicles list after deletion
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

  onSearch(): void {
    const id = this.vehicleForm.get('id')?.value;
    if (id) {
      this.vehicleService.searchVehicle(id).subscribe(
        response => {
          if (response.length > 0) {
            this.populateForm(response[0]);
          } else {
            alert('Vehículo no encontrado.');
          }
        },
        error => {
          console.error('Error al buscar vehículo:', error);
          alert('Error al buscar vehículo');
        }
      );
    } else {
      alert('Por favor, ingrese un ID válido.');
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
    });
    this.vehicleId = vehicle.id || '';
    this.onVehicleTypeChange();
  }

  resetForm(): void {
    this.vehicleForm.reset();
    this.vehicleId = '';
    this.selectedVehicleType = '';
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(
      response => {
        this.vehicles = response;
      },
      error => {
        console.error('Error al cargar vehículos:', error);
        alert('Error al cargar vehículos');
      }
    );
  }
}
