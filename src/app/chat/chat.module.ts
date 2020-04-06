import { ChatRoutingModule } from './chat.routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
      ChatComponent
    ],
    imports: [
      CommonModule,
      FontAwesomeModule,
      ChatRoutingModule
    ],
    providers: [],
  })
  export class ChatModule { }