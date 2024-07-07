import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehiclepage',
  templateUrl: './vehiclepage.component.html',
  styles: `
  
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
   /* Cambia este color según tu preferencia */
  border-radius: 8px; /* Opcional: para esquinas redondeadas */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

mat-card {
  width: 100%;
  padding: 20px;
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
export class VehiclepageComponent implements OnInit {

  vehicleForm: FormGroup;
  selectedVehicleType: string = 'car';

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      vehicleType: ['car'],
      brand: [''],
      model: [''],
      licensePlate: [''],
      color: ['']
    });
  }

  ngOnInit(): void {}

  onVehicleTypeChange(vehicleType: string): void {
    this.selectedVehicleType = vehicleType;
    this.resetFormFields();
  }

  resetFormFields(): void {
    this.vehicleForm.patchValue({
      brand: '',
      model: '',
      licensePlate: '',
      color: ''
    });
  }

  onSubmit(): void {
    console.log(this.vehicleForm.value);
  }

}
