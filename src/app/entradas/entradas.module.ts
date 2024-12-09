import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { DailypageComponent } from './pages/dailypage/dailypage.component';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { ListpageComponent } from './pages/listpage/listpage.component';
import { RegisterpageComponent } from './pages/registerpage/registerpage.component';
import { VehiclepageComponent } from './pages/vehiclepage/vehiclepage.component';
import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HelpComponent } from './pages/help/help.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistroProveedorpageComponent } from './pages/registro-proveedorpage/registro-proveedorpage.component';
import { CobranzaComponent } from './pages/cobranza/cobranza.component';


@NgModule({
  declarations: [
    DailypageComponent,
    LayoutpageComponent,
    ListpageComponent,
    RegisterpageComponent,
    VehiclepageComponent,
    HelpComponent,
    ProfileComponent,
    RegistroProveedorpageComponent,
    CobranzaComponent
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class EntradasModule { }
