import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { NewpageComponent } from './pages/newpage/newpage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';
import { HeropageComponent } from './pages/heropage/heropage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutpageComponent,
    children: [
      {path:'new-hero', component:NewpageComponent},
      {path:'search', component:SearchpageComponent},
      {path:'edit/:id',component:NewpageComponent},
      {path:':id', component:HeropageComponent},
      {path:'**', redirectTo:'List'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
