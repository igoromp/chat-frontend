import { RouterModule,  Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';


const LOGIN_ROUTES : Routes = [
    {path:'', component:LoginComponent}
]

@NgModule({
    imports:[CommonModule, RouterModule.forChild(LOGIN_ROUTES)],
    exports:[RouterModule],
    providers:[]
})
export class LoginRoutingModule {}