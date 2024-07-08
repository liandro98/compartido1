import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-proveedorpage',
  templateUrl: './registro-proveedorpage.component.html',
  styles: 
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
})
export class RegistroProveedorpageComponent implements OnInit {
  supplierForm!: FormGroup;
  showSuccessMessage: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.supplierForm = this.fb.group({
      vehicleType: ['', Validators.required],
      model: ['', Validators.required],
      plates: ['', Validators.required],
      companyName: ['', Validators.required],
      providerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      officialId: ['', Validators.required],
      entryDate: [''],
      exitDate: ['']
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      // Aquí puedes procesar los datos, enviarlos al servidor, etc.
      const formData = this.supplierForm.value;
      console.log('Formulario enviado:', formData);

      // Simula el proceso de envío al servidor (aquí puedes hacer una llamada HTTP)
      // En este ejemplo, simplemente mostramos el mensaje de éxito
      this.showSuccessMessage = true;
      this.supplierForm.reset();

    } 
  }

}
