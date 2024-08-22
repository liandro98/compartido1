import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehiculo.service';
import { Vehiculo } from '../../interfaces/vehiculo';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  vehicle: Vehiculo = {idUsuario: 0, TipoVehiculo: '', Marca: '', Modelo: '', Placa: '', Descripcion: '', idVehiculo: 0};
  vehicles: Vehiculo[] = [];
  editing: boolean = false;
  currentId: number | null = null;
  selectedVehicleType: string = '';
  users: any[] = []; // Para almacenar usuarios encontrados

  constructor(
    private vehicleService: VehicleService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadUsers();
  }

  loadVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(vehicles => this.vehicles = vehicles);
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  onVehicleTypeChange(type: string): void {
    this.selectedVehicleType = type;
    
    // Resetea los campos si se selecciona "bicicleta"
    if (type === 'bicicleta') {
      this.vehicle.Marca = '';
      this.vehicle.Modelo = '';
      this.vehicle.Placa = '';
    }
  }
  
  onSubmit(form: NgForm): void {
    if (this.editing) {
      this.vehicleService.updateVehicle(this.currentId!, this.vehicle).subscribe(
        () => {
          this.loadVehicles();
          this.resetForm();
          this.snackBar.open('Vehículo actualizado con éxito', 'Cerrar', { panelClass: ['success-snackbar'] });
        },
        error => {
          this.snackBar.open('Error al actualizar vehículo', 'Cerrar', { panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.vehicleService.addVehicle(this.vehicle).subscribe(
        () => {
          this.loadVehicles();
          this.resetForm();
          this.snackBar.open('Vehículo agregado con éxito', 'Cerrar', { panelClass: ['success-snackbar'] });
        },
        error => {
          this.snackBar.open('Error al agregar vehículo', 'Cerrar', { panelClass: ['error-snackbar'] });
        }
      );
    }
  }

  editVehicle(id: number): void {
    this.vehicleService.getVehicleById(id).subscribe(vehicle => {
      this.vehicle = vehicle;
      this.currentId = id;
      this.editing = true;
      this.selectedVehicleType = vehicle.TipoVehiculo;
    });
  }

  deleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe(
      () => {
        this.loadVehicles();
        this.snackBar.open('Vehículo eliminado con éxito', 'Cerrar', { panelClass: ['success-snackbar'] });
      },
      error => {
        this.snackBar.open('Error al eliminar vehículo', 'Cerrar', { panelClass: ['error-snackbar'] });
      }
    );
  }

  resetForm(): void {
    this.vehicle = { idUsuario: 0, TipoVehiculo: '', Marca: '', Modelo: '', Placa: '', Descripcion: '', idVehiculo: 0 };
    this.editing = false;
    this.currentId = null;
    this.selectedVehicleType = '';
  }
}
