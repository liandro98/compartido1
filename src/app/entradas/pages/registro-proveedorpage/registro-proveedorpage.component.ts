import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../services/supplier-service.service';
import { Supplier } from '../../interfaces/supplier'; 

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

  constructor(private fb: FormBuilder, private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.supplierForm = this.fb.group({
      model: ['', Validators.required],
      plates: ['', Validators.required],
      companyName: ['', Validators.required],
      providerName: ['', Validators.required],
      officialId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      // Asignar los valores del formulario al objeto formData
      const formData: Supplier = {
        userType: 'Proveedor',
        idUsuario: '', // Dejar vacío si se generará automáticamente o asignar el valor si ya se tiene
        email: '', // El email puede ser vacío o nulo
        fullName: this.supplierForm.get('providerName')?.value,
        model: this.supplierForm.get('model')?.value,
        plates: this.supplierForm.get('plates')?.value,
        companyName: this.supplierForm.get('companyName')?.value,
        providerName: this.supplierForm.get('providerName')?.value,
        officialId: this.supplierForm.get('officialId')?.value
      };
  
      this.supplierService.registerSupplier(formData).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          alert('Proveedor registrado con éxito');
          this.supplierForm.reset(); // Limpiar el formulario después del registro
        },
        error => {
          console.error('Error al registrar proveedor:', error);
          alert('Error al registrar proveedor');
        }
      );
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
  
}
