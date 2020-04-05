import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import {  Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


const APP_ROUTES : Routes = [
    { path: 'chat', component: ChatComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
];
  
export const routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);



