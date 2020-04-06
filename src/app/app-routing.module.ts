import { AuthGuardService } from './guard/auth-guard.service';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const APP_ROUTES: Routes = [
  { path: "login", loadChildren:()=>import('./login/login.module').then(mod=>mod.LoginModule)},
  { path: "chat", loadChildren:()=>import('./chat/chat.module').then(mod=>mod.ChatModule), 
    canActivate:[AuthGuardService] },
  { path: "", redirectTo:'login', pathMatch:'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];



//export const routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(APP_ROUTES)],
  exports:[RouterModule],
  providers: []
})
export class AppRoutingModule {}
