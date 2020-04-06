import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login({name, password}) {
    if( name === 'igoromp' && password  === '123456') {
      localStorage.setItem('islogged','true');
    } else {
      localStorage.setItem('islogged', '');
    }
  }

  logout() {
    localStorage.setItem('islogged','');
  }

  isAuthenticated() :boolean {
    const logged = localStorage.getItem('islogged')
    return logged === 'true';
  }
}
