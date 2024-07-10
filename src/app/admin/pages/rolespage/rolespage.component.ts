import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Role {
  name: string;
  type: string;
}

@Component({
  selector: 'app-rolespage',
  templateUrl: './rolespage.component.html',
  styles: `mat-card {
    max-width: 600px;
    margin: 20px auto;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  mat-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  `
})
export class RolespageComponent implements OnInit {
  roleForm: FormGroup;
  roles: Role[] = [];
  selectedRole: Role | null = null;

  constructor(private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required],
      roleType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load initial roles if needed
    this.roles = [
      { name: 'Administrador', type: 'general' },
      { name: 'Guardia', type: 'worker' }
    ];
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const newRole: Role = {
        name: this.roleForm.get('roleName')?.value,
        type: this.roleForm.get('roleType')?.value
      };

      if (this.selectedRole) {
        // Edit existing role
        const index = this.roles.indexOf(this.selectedRole);
        this.roles[index] = newRole;
      } else {
        // Add new role
        this.roles.push(newRole);
      }

      this.resetForm();
    }
  }

  onDelete(): void {
    if (this.selectedRole) {
      const index = this.roles.indexOf(this.selectedRole);
      this.roles.splice(index, 1);
      this.resetForm();
    }
  }

  onEdit(role: Role): void {
    this.selectedRole = role;
    this.roleForm.patchValue(role);
  }

  resetForm(): void {
    this.selectedRole = null;
    this.roleForm.reset();
  }

}
