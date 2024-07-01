import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { ListpageComponent } from './pages/listpage/listpage.component';
import { RegisterpageComponent } from './pages/registerpage/registerpage.component';
import { VehiclepageComponent } from './pages/vehiclepage/vehiclepage.component';
import { DailypageComponent } from './pages/dailypage/dailypage.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutpageComponent,
    children: [
    {path:'registro', component: RegisterpageComponent},
    {path:'veiculo', component:VehiclepageComponent},
    {path:'daily', component:DailypageComponent},
    {path:'list', component:ListpageComponent},
    {path:'**',redirectTo:'list'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradasRoutingModule { }
