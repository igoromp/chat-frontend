import { LoginRoutingModule } from './login.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
    declarations:[LoginComponent],
    imports:[CommonModule,FormsModule,
        ReactiveFormsModule,LoginRoutingModule],
    providers:[]
})
export class LoginModule {}