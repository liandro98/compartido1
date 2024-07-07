import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RolespageComponent } from './pages/rolespage/rolespage.component';


//Se declara una constante routes
const routes: Routes =[
    {
        path: '',
        component:HomepageComponent,
        children:[
            {path:'roles', component:RolespageComponent},
            {path:'**',redirectTo:'roles'}
        ]   
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class MaterialRoutingModule {}