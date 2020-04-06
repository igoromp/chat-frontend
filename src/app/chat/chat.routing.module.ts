import { ChatComponent } from './chat.component';
import { RouterModule,  Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";


const CHAT_ROUTES : Routes = [
    {path:'', component:ChatComponent}
]

@NgModule({
    imports:[CommonModule, RouterModule.forChild(CHAT_ROUTES)],
    exports:[RouterModule],
    providers:[]
})
export class ChatRoutingModule {}