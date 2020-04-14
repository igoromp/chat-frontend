import { Injectable } from '@angular/core';
import Usuario from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private jsonString(json:any){
    return JSON.stringify(json)
  }

  private jsonParse(json:any){
    return JSON.parse(json)
  }
    
  set usuario(val:any){
    sessionStorage.setItem('usuario', this.jsonString(val));
  }
  get usuario(){
    return this.jsonParse(sessionStorage.getItem('usuario'));
  }

  set token(val:string){
    sessionStorage.setItem('token', val);
  }
  get token(){
    return sessionStorage.getItem('token');
  }

  set isLogged(val:string){
    sessionStorage.setItem('is_logged', val);
  }

  get isLogged(){
    return sessionStorage.getItem('is_logged');
  }

  set chatHash(val: string){
    sessionStorage.setItem('chat_hash', val);
  }

  get chatHash() {
    return sessionStorage.getItem('chat_hash');
  }

  set contacts(contacts){
    sessionStorage.setItem('user_contacts', JSON.stringify(contacts))
  }

  get contacts(){
    return this.jsonParse(sessionStorage.getItem('user_contacts'))
  }
}
