import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartpageComponent } from './pages/startpage/startpage.component';
import { RegepageComponent } from './pages/regepage/regepage.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PoliticaspageComponent } from './pages/politicaspage/politicaspage.component';
import { RolespageComponent } from '../material/pages/rolespage/rolespage.component';


//Se declara una constante routes
const routes: Routes =[
    {
        path: '',
        component:StartpageComponent,
        children:[
            {path:'entrada', component:RegepageComponent},
            {path:'roles', component:RolespageComponent},
            {path:'reportes', component:ReportesComponent},
            {path:'politicas', component:PoliticaspageComponent},
            {path:'**',redirectTo:''}
        ]   
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class InicioRoutingModule {}