import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddwpageComponent } from './pages/addwpage/addwpage.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AddwpageComponent,
    PermisosComponent,
    LayoutpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
