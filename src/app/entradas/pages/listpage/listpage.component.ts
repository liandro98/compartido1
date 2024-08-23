import { EntradaSalidaService } from './../../services/entrada-salida.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/usuario.service'; // Ajusta la ruta según sea necesario
import { MatSnackBar } from '@angular/material/snack-bar';
import { EntradaSalida } from '../../interfaces/entrada-salida';

@Component({
  selector: 'app-listpage',
  templateUrl: './listpage.component.html',
  styles: [
    `
      body {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .contenedor {
        width: 70vw;
      }
      .mat-h2,
      .mat-h3,
      .mat-body-strong {
        text-align: center;
        margin-bottom: 20px;
      }

      .mat-form-field {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
      }

      table {
        width: 100%;
      }

      button {
        margin-top: 10px;
      }
    `,
  ],
})
export class ListpageComponent implements OnInit {
  users: any[] = []; // Arreglo para usuarios
  maxParkingSpaces: number = 30;
  occupiedSpaces: number = 0; // Inicialmente espacios ocupados
  barcode: string = ''; // Campo para el código de barras

  displayedColumns: string[] = ['name', 'userType', 'entryTime', 'action'];
  dataSource = new MatTableDataSource<any>(this.users);

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private entradaSalidaService: EntradaSalidaService
  ) {}

  ngOnInit(): void {
    this.getRegistros();
  }

  addVehicleByBarcode(): void {
    if (this.barcode.trim()) {
      this.userService.searchUserByBarcode(this.barcode).subscribe((user) => {
        if (user) {
          this.addUserToParking(user);
          this.barcode = ''; // Limpiar el campo de entrada
        } else {
          this.snackBar.open('Usuario no encontrado', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        }
      });
    }
  }

  addUserToParking(user: any): void {
    // Lógica para agregar un nuevo usuario basado en el código de barras encontrado
    const newEntry: EntradaSalida = {
      idUsuario: user.ID,
      HoraEntrada: new Date().getTime(),
    };

    this.entradaSalidaService.addEntradaSalida(newEntry).subscribe(
      (res: any) => {
        this.snackBar.open(
          `Vehículo ${user.nombre} ha entrado al estacionamiento`,
          'Cerrar',
          { duration: 3000, panelClass: ['success-snackbar'] }
        );
        this.getRegistros();
      },
      (err: any) => {
        this.snackBar.open(`Error al intentar ingresar`, 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  userExited(index: number) {
    const exitedUser = this.users[index];

    this.entradaSalidaService
      .updateEntradaSalida(exitedUser.idE)
      .subscribe((res: any) => {
        this.getRegistros();
        this.snackBar.open(
          `Vehículo ${exitedUser.name} ha salido del estacionamiento`,
          'Cerrar',
          { duration: 3000, panelClass: ['info-snackbar'] }
        );
      });
    // Simular la salida de un usuario del estacionamiento
  }

  getRegistros() {
    this.entradaSalidaService
      .getEntradasSalidas(this.getFormattedDate())
      .subscribe((res: any) => {
        
        this.users = res.filter((record: any) => record.HoraSalida === null);
        this.updateOccupiedSpaces();
      });
  }

  updateOccupiedSpaces() {
    this.occupiedSpaces = this.users.length;
    this.dataSource = new MatTableDataSource<any>(this.users); // Actualizar dataSource
  }

  filterEntries() {
    // Implementar lógica de filtrado basada en el rango de fechas (startDate y endDate)
    // Ejemplo:
    const startDate = (document.getElementById('startDate') as HTMLInputElement)
      .value;
    const endDate = (document.getElementById('endDate') as HTMLInputElement)
      .value;
    // Implementar lógica para filtrar el arreglo parkedVehicles basado en startDate y endDate
    // Esto es solo un marcador, la implementación real dependerá de tu backend o fuente de datos
  }

  getFormattedDate(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: string = String(today.getMonth() + 1).padStart(2, '0');
    const day: string = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
