import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { ReportespageComponent } from './pages/reportespage/reportespage.component';
import { RegistropageComponent } from './pages/registropage/registropage.component';

const routes: Routes = [
    {
        path:'',
        component:LayoutpageComponent,
        children:[
            {path:'registro',component:RegistropageComponent},
            {path:'reportes',component:ReportespageComponent},
            {path:'**',redirectTo:'registro'}
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})  

export class AuthRoutingModule{ }