import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeropageComponent } from './pages/heropage/heropage.component';
import { ListpageComponent } from './pages/listpage/listpage.component';
import { NewpageComponent } from './pages/newpage/newpage.component';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { SearchpageComponent } from './pages/searchpage/searchpage.component';


@NgModule({
  declarations: [
    HeropageComponent,
    ListpageComponent,
    NewpageComponent,
    LayoutpageComponent,
    SearchpageComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
