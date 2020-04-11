import { Injectable } from '@angular/core';
import Usuario from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class Generico {
  _usuario: Usuario;

  set usuario(usuario: Usuario) {
    this._usuario = usuario;
  }

  get usuario() {
    return this._usuario;
  }


}
