import { LoginCadComponent } from './login-cad/login-cad.component';
import { LoginRoutingModule } from './login.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
    declarations:[LoginComponent, LoginCadComponent],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        SharedModule,
    ],
})
export class LoginModule {}