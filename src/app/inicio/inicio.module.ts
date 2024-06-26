import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartpageComponent } from './pages/startpage/startpage.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { RolePpageComponent } from './pages/role-ppage/role-ppage.component';
import { PoliticaspageComponent } from './pages/politicaspage/politicaspage.component';
import { RegepageComponent } from './pages/regepage/regepage.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    StartpageComponent,
    ReportesComponent,
    RolePpageComponent,
    PoliticaspageComponent,
    RegepageComponent
  ],
  imports: [
    CommonModule,
    InicioModule,
    MaterialModule,
  ]
})
export class InicioModule { }
