import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { AddwpageComponent } from './pages/addwpage/addwpage.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PassrecopageComponent } from './pages/passrecopage/passrecopage.component';
import { PassnewpageComponent } from './pages/passnewpage/passnewpage.component';
import { ConfnwPpageComponent } from './pages/confnw-ppage/confnw-ppage.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutpageComponent,
    children: [
    {path:'registro', component: AddwpageComponent},
    {path:'perfil', component: ProfileComponent},
    {path:'changeP', component: PassrecopageComponent},
    {path:'newP', component: PassnewpageComponent},
    {path:'confnp', component: ConfnwPpageComponent},
    {path:'**',redirectTo:'registro'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
