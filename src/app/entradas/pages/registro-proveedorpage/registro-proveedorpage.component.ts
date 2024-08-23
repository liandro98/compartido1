import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../services/supplier-service.service';
import { Supplier } from '../../interfaces/supplier'; 
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar

@Component({
  selector: 'app-registro-proveedorpage',
  templateUrl: './registro-proveedorpage.component.html',
  styles: [
    `
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
    `
  ]
})
export class RegistroProveedorpageComponent implements OnInit {
  supplierForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.supplierForm = this.fb.group({
      model: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]], // Letras, números y espacios
      plates: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]], // Solo letras y números
      companyName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]], // Solo letras y espacios
      providerName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]], // Solo letras y espacios
    });
  }
  

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const formData: Supplier = {
        userType: 'Proveedor',
        idUsuario: '',
        email: '',
        fullName: this.supplierForm.get('providerName')?.value,
        model: this.supplierForm.get('model')?.value,
        plates: this.supplierForm.get('plates')?.value,
        companyName: this.supplierForm.get('companyName')?.value,
        providerName: this.supplierForm.get('providerName')?.value
      };

      this.supplierService.registerSupplier(formData).subscribe(
        response => {
          this.snackBar.open('Proveedor registrado con éxito', 'Cerrar', { panelClass: ['success-snackbar'] });
          this.supplierForm.reset(); // Limpiar el formulario después del registro
        },
        error => {
          this.snackBar.open('Error al registrar proveedor', 'Cerrar', { panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.snackBar.open('Por favor, complete todos los campos requeridos.', 'Cerrar', { panelClass: ['error-snackbar'] });
    }
  }
}
