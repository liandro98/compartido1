import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { RegistropageComponent } from './pages/registropage/registropage.component';
import { PasswordRecoverypageComponent } from './pages/password-recoverypage/password-recoverypage.component';
import { CodeVerificationpageComponent } from './pages/code-verificationpage/code-verificationpage.component';
import { ThankYoupageComponent } from './pages/thank-youpage/thank-youpage.component';
import { HomeComponent } from './pages/home/home.component';
import { ManualComponent } from './pages/manual/manual.component';

const routes: Routes = [
    {
        path:'',
        component:LayoutpageComponent,
        children:[
            {path:'registro',component:RegistropageComponent},
            {path:'recovery', component:PasswordRecoverypageComponent},
            {path:'verification', component:CodeVerificationpageComponent},
            {path:'thanku', component:ThankYoupageComponent},
            {path:'home', component:HomeComponent},
            {path:'manual', component:ManualComponent},
            {path:'**',redirectTo:'home'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})  

export class AuthRoutingModule{ }