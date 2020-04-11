import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    AlertComponent
  ],
  exports:[
    FormDebugComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
