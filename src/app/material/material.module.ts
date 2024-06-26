import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RolespageComponent } from './pages/rolespage/rolespage.component';



@NgModule({
  declarations: [
    HomepageComponent,
    RolespageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
