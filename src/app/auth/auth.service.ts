import { SessionService } from './../base/session/session.service';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login-service/login.service';
import { map } from 'rxjs/operators';
import Usuario from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loginService: LoginService,
    private route : Router,
    private session : SessionService
    ) { }

  login(obj : any) {
    return  this.loginService.login(obj)
      .pipe(
        map(( res:Usuario ) => {
          this.setSession(res);
          return true;
        })
      );
  }

  private setSession(res: any) {
    const { email, name , token } = res;
    this.session.usuario = { email, name };
    this.session.token = token;
    this.session.isLogged = 'true';
  }

  logout() {
    sessionStorage.clear();
    this.route.navigate(['']);
  }

  isAuthenticated() :boolean {
    return this.session.isLogged === 'true';
  }
}
