import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./heroes/heroes.module').then(m=> m.HeroesModule)
  },
  {
    path:'material',
    loadChildren: ()=> import('./material/material-routing.module').then(m=> m.MaterialRoutingModule)
  },
  {
    path:'inicio',
    loadChildren: ()=> import('./inicio/inicio-routing.module').then(m=> m.InicioRoutingModule)
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path :'**',
    redirectTo:'404'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
