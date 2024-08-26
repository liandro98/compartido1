import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SupplierService } from '../../services/supplier-service.service';
import { Supplier } from '../../interfaces/supplier'; 
import { MatSnackBar } from '@angular/material/snack-bar';

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
  supplierForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private snackBar: MatSnackBar
  ) {
    this.supplierForm = this.fb.group({
      model: ['', [Validators.required, Validators.maxLength(50), this.modelValidator]],
      plates: ['', [Validators.required, Validators.maxLength(12), this.platesValidator]],
      companyName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-\\s]+$')]], // Letras, números, espacios y guiones
      providerName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]] // Solo letras y espacios
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const formData: Supplier = {
        userType: 'Proveedor',
        idUsuario: '',
        email: '', // El campo 'email' no está en el formulario, considerar agregarlo si es necesario
        fullName: this.supplierForm.get('providerName')?.value,
        model: this.supplierForm.get('model')?.value,
        plates: this.supplierForm.get('plates')?.value,
        companyName: this.supplierForm.get('companyName')?.value,
        providerName: this.supplierForm.get('providerName')?.value
      };

      this.supplierService.registerSupplier(formData).subscribe(
        response => {
          this.snackBar.open('Proveedor registrado con éxito', 'Cerrar', { panelClass: ['success-snackbar'] });
          this.supplierForm.reset();
        },
        error => {
          this.snackBar.open('Error al registrar proveedor', 'Cerrar', { panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.showValidationErrors();
    }
  }

  showValidationErrors(): void {
    const errorMessages: string[] = [];

    Object.keys(this.supplierForm.controls).forEach(field => {
      const control = this.supplierForm.get(field);
      if (control?.invalid) {
        const errorMessage = this.getErrorMessage(field, control);
        errorMessages.push(errorMessage);
      }
    });

    if (errorMessages.length > 0) {
      this.snackBar.open(errorMessages.join('\n'), 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar'],
        verticalPosition: 'top'
      });
    }
  }

  getErrorMessage(field: string, control: AbstractControl): string {
    if (control.hasError('required')) {
      return `${this.getFieldName(field)} es requerido.`;
    } else if (control.hasError('pattern')) {
      return `${this.getFieldName(field)} tiene un formato inválido.`;
    } else if (control.hasError('maxlength')) {
      return `${this.getFieldName(field)} no puede tener más de ${control.errors!['maxlength'].requiredLength} caracteres.`;
    } else {
      return `Error en el campo ${this.getFieldName(field)}.`;
    }
  }

  getFieldName(field: string): string {
    switch (field) {
      case 'model': return 'Modelo';
      case 'plates': return 'Placas';
      case 'companyName': return 'Nombre de la Empresa';
      case 'providerName': return 'Nombre del Proveedor';
      default: return field;
    }
  }

  modelValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const isValid = /^[a-zA-Z0-9\s]+$/.test(value); // Letras, números y espacios
    return isValid ? null : { invalidFormat: true };
  }

  platesValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const isValid = /^[a-zA-Z0-9-]+$/.test(value); // Letras, números y guiones
    return isValid ? null : { invalidFormat: true };
  }
}
