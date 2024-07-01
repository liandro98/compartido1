import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
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

export class RegisterpageComponent implements OnInit {
  vehicleForm: FormGroup;
  selectedUserType: string = '';
  selectedCareer: string = '';
  
  // Define the groups for each career
  careerGroups: { [key: string]: string[] } = {
    'administracion': ['GDA0631', 'GDA0632'],
    'turismo': ['GDT0631', 'GDT0632'],
    'entornos': ['GDE0631', 'GDE0632'],
    'software': ['GDS0631', 'GDS0632', 'GDS0633'],
    'diseno': ['GDD0631', 'GDD0632'],
    'mecatronica': ['GDM0631', 'GDM0632'],
    'procesos': ['GDP0631', 'GDP0632']
  };

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values
    this.vehicleForm = this.fb.group({
      userType: ['', Validators.required],
      controlNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      career: [''],
      group: ['']
    });
  }

  ngOnInit(): void {
    this.onUserTypeChange();
  }

  // Handle user type change
  onUserTypeChange(): void {
    // Reset form controls based on user type
    if (this.vehicleForm.value.userType === 'student') {
      this.vehicleForm.addControl('controlNumber', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('career', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('group', this.fb.control('', Validators.required));
    } else {
      this.vehicleForm.removeControl('controlNumber');
      this.vehicleForm.removeControl('career');
      this.vehicleForm.removeControl('group');
    }
  }

  // Handle career change
  onCareerChange(): void {
    this.selectedCareer = this.vehicleForm.value.career;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      console.log('Formulario enviado:', formData);

      if (formData.userType === 'student') {
        console.log('Alumno:', formData);
      } else if (formData.userType === 'teacher') {
        console.log('Profesor:', formData);
      }
      alert('Formulario enviado');
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
