import { Injectable } from '@angular/core';
import { LoginService } from '../login/login-service/login.service';
import { map } from 'rxjs/operators';
import Usuario from '../models/user';
import { Router } from '@angular/router';
import { Generico } from '../base/generico.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loginService: LoginService,
    private route : Router,
    private generico : Generico
    ) { }

  login(obj : any) {
    return  this.loginService.login(obj)
      .pipe(
        map(( res:Usuario ) => {
          const { email, name , token } = res;
          this.setSession(token);
          
          this.generico.usuario = { email, name };
          return true;
        })
      );
  }

  private setSession(token: string) {
    sessionStorage.setItem('id_token', token);
    sessionStorage.setItem('is_logged', 'true');
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['']);
  }

  isAuthenticated() :boolean {
    const logged = sessionStorage.getItem('is_logged')
    return logged === 'true';
  }
}
