import { BaseService } from './../../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class LoginService {
  
  constructor(
    private http:HttpClient,
    private base: BaseService
    ) { }

  cadastrarUsuario(usuario:any) {
    return this.http.post(`${this.base.URL}/users`,usuario)
  }

  login(obj: any) {
    return this.http.post(`${this.base.URL}/users/login`,obj)
  }
}
