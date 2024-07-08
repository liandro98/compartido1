import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { AddwpageComponent } from './pages/addwpage/addwpage.component';
import { PermisosComponent } from './pages/permisos/permisos.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutpageComponent,
    children: [
    {path:'registro', component: AddwpageComponent},
    {path:'permisos', component: PermisosComponent},
   // {path:'noti', component: NotificacionespageComponent},
    //{path:'ayuda', component: HelpComponent},
    //{path:'perfil', component: ProfileComponent},
    {path:'**',redirectTo:'registro'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
