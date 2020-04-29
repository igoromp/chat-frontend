import { MessageComponent } from './message/message/message.component';
import { ChatRoutingModule } from './chat.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      ChatComponent, 
      MessageComponent
    ],
    imports: [
      CommonModule,
      FontAwesomeModule,
      ChatRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [],
  })
  export class ChatModule { }