import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/usuario.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styles:`
  @import '~ngx-toastr/toastr.css';

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
  }`
})
export class RegisterpageComponent implements OnInit {
  vehicleForm: FormGroup;
  userId: string = ''; // Para actualizar y eliminar usuarios
  searchId: string = '';
  searchName: string = '';
  selectedCareer: string = '';
  users: any[] = []; // Para almacenar usuarios encontrados
  allUsers: any[] = []; // Para almacenar todos los usuarios
  filteredUsers: any[] = []; // Para almacenar usuarios filtrados

  
  careerGroups: { [key: string]: string[] } = {
    'administracion': ['GDA0631', 'GDA0632'],
    'turismo': ['GDT0631', 'GDT0632'],
    'entornos': ['GDE0631', 'GDE0632'],
    'software': ['GDS0631', 'GDS0632', 'GDS0633'],
    'diseno': ['GDD0631', 'GDD0632'],
    'mecatronica': ['GDM0631', 'GDM0632'],
    'procesos': ['GDP0631', 'GDP0632']
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.vehicleForm = this.fb.group({
      userType: ['', Validators.required],
      controlNumber: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      career: [''],
      groupo: ['']
    });
  }

  ngOnInit(): void {
    this.onUserTypeChange();
    this.fetchAllUsers();
  }

  onUserTypeChange(): void {
    const userType = this.vehicleForm.value.userType;

    if (userType === 'Estudiante') {
      this.vehicleForm.addControl('controlNumber', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('career', this.fb.control('', Validators.required));
      this.vehicleForm.addControl('groupo', this.fb.control('', Validators.required));
    } else if (userType === 'Profesor') {
      // Código específico para Profesor (si aplica)
    }
  }
  
  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.allUsers = users;
        this.users = users;
      },
      (error) => {
        this.toastr.error('Error fetching users', 'Error');
        console.error('Error fetching users', error);
      }
    );
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      if (this.userId) {
        this.userService.updateUser(this.userId, formData).subscribe(
          response => {
            this.toastr.success('Usuario actualizado', 'Éxito');
            this.userId = ''; // Limpiar ID después de la actualización
            this.vehicleForm.reset(); // Limpiar el formulario
          },
          error => {
            this.toastr.error('Error al actualizar usuario', 'Error');
            console.error('Error al actualizar usuario:', error);
          }
        );
      } else {
        this.userService.registerUser(formData).subscribe(
          response => {
            this.toastr.success('Formulario enviado', 'Éxito');
            this.vehicleForm.reset(); // Limpiar el formulario después del registro
          },
          error => {
            this.toastr.error('Error al registrar usuario', 'Error');
            console.error('Error al registrar usuario:', error);
          }
        );
      }
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos.', 'Advertencia');
    }
  }

  onDelete(): void {
    if (this.userId) {
      this.userService.deleteUser(this.userId).subscribe(
        response => {
          this.toastr.success('Usuario eliminado', 'Éxito');
          this.userId = ''; // Limpiar ID después de la eliminación
          this.vehicleForm.reset(); // Limpiar el formulario
        },
        error => {
          this.toastr.error('Error al eliminar usuario', 'Error');
          console.error('Error al eliminar usuario:', error);
        }
      );
    } else {
      this.toastr.warning('ID de usuario no especificado.', 'Advertencia');
    }
  }

  onWorkerSelect(event: any): void {
    const selectedUser = event.value;
    console.log('Usuario seleccionado:', selectedUser);
    this.populateForm(selectedUser);
  }

  onUpdate(): void {
    if (this.userId) {
      const formData = this.vehicleForm.value;
      this.userService.updateUser(this.userId, formData).subscribe(
        response => {
          this.toastr.success('Usuario actualizado', 'Éxito');
          this.userId = ''; // Limpiar ID después de la actualización
          this.vehicleForm.reset(); // Limpiar el formulario
        },
        error => {
          this.toastr.error('Error al actualizar usuario', 'Error');
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.toastr.warning('ID de usuario no especificado para actualización.', 'Advertencia');
    }
  }

  onCareerChange(): void {
    const career = this.vehicleForm.value.career;
    console.log('Carrera seleccionada en onCareerChange:', career);

    if (career) {
      this.selectedCareer = career;
      const groups = this.careerGroups[career] || [];
      console.log('Grupos para la carrera seleccionada:', groups);
      // Actualiza el control del grupo
      this.vehicleForm.get('groupo')?.setValue('');
      this.vehicleForm.updateValueAndValidity(); // Forzar la actualización
    } else {
      this.selectedCareer = '';
      this.vehicleForm.get('groupo')?.setValue('');
      this.vehicleForm.updateValueAndValidity(); // Forzar la actualización
    }
  }

  populateForm(user: any): void {
    this.vehicleForm.patchValue({
      userType: user.TipoUsuario || '',
      controlNumber: user.controlNumber || '',
      email: user.CorreoElectronico || '',
      fullName: user.Nombre || '',
      career: user.career || '',
      groupo: user.groupo || ''
    });

    this.userId = user.idUsuario;

    if (user.TipoUsuario === 'Estudiante') {
      if (!this.vehicleForm.get('career')) {
        this.vehicleForm.addControl('career', this.fb.control(user.career || '', Validators.required));
      }
      if (!this.vehicleForm.get('groupo')) {
        this.vehicleForm.addControl('groupo', this.fb.control(user.groupo || '', Validators.required));
      }
      this.selectedCareer = user.career || '';
      const groups = this.careerGroups[this.selectedCareer] || [];
      if (user.groupo && groups.includes(user.groupo)) {
        this.vehicleForm.get('groupo')?.setValue(user.groupo);
      } else {
        this.vehicleForm.get('groupo')?.setValue('');
      }
    } else {
      this.vehicleForm.removeControl('career');
      this.vehicleForm.removeControl('groupo');
      this.selectedCareer = '';
    }
  }
}
