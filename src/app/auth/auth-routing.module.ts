import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { ReportespageComponent } from './pages/reportespage/reportespage.component';
import { RegistropageComponent } from './pages/registropage/registropage.component';
import { PasswordRecoverypageComponent } from './pages/password-recoverypage/password-recoverypage.component';
import { CodeVerificationpageComponent } from './pages/code-verificationpage/code-verificationpage.component';
import { ThankYoupageComponent } from './pages/thank-youpage/thank-youpage.component';

const routes: Routes = [
    {
        path:'',
        component:LayoutpageComponent,
        children:[
            {path:'registro',component:RegistropageComponent},
            {path:'reportes',component:ReportespageComponent},
            {path:'recovery', component:PasswordRecoverypageComponent},
            {path:'verification', component:CodeVerificationpageComponent},
            {path:'thanku', component:ThankYoupageComponent},
            {path:'**',redirectTo:'registro'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})  

export class AuthRoutingModule{ }import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


//Se declara una constante routes
const routes: Routes =[
    {
        path: '',
        component:LayoutPageComponent,
        children:[
            {path:'login', component:LoginPageComponent},
            {path:'**',redirectTo:'login'}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class AuthRoutingModule {}