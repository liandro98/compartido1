import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddwpageComponent } from './pages/addwpage/addwpage.component';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { MaterialModule } from '../material/material.module';
import { PerfilpageComponent } from './pages/perfilpage/perfilpage.component';
import { PassrecopageComponent } from './pages/passrecopage/passrecopage.component';
import { PassnewpageComponent } from './pages/passnewpage/passnewpage.component';
import { ConfnwPpageComponent } from './pages/confnw-ppage/confnw-ppage.component';


@NgModule({
  declarations: [
    AddwpageComponent,
    LayoutpageComponent,
    PerfilpageComponent,
    PassrecopageComponent,
    PassnewpageComponent,
    ConfnwPpageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
