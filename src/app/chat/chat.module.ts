import { MessageComponent } from './message/message/message.component';
import { ChatRoutingModule } from './chat.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      ChatComponent, 
      MessageComponent
    ],
    imports: [
      CommonModule,
      FontAwesomeModule,
      ChatRoutingModule,
      FormsModule
    ],
    providers: [],
  })
  export class ChatModule { }