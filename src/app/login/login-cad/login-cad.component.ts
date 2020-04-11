import { AlertComponent } from './../../shared/alert/alert.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginService } from '../login-service/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login-cad',
  templateUrl: './login-cad.component.html',
  styleUrls: ['./login-cad.component.scss']
})
export class LoginCadComponent implements OnInit {
  formulario:FormGroup;
  response:any;

  @ViewChild(AlertComponent) alertWrap:AlertComponent;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name:[null],
      email: [null],
      password: [null],
      confirmPassword: [null]
    })
  }

  ngAfterViewInit() {
    console.log(this.alertWrap);
  }  

  cadastrarUsuario() {
    this.loginService
      .cadastrarUsuario(this.formulario.value)
      .subscribe(this.OnSuccess, this.OnError)
  }

  OnSuccess = (res) =>{
    console.log("RETORNO DE SERVICO",res);
    this.response= res;
    if ( res) {
      //this.route.navigate(['/login'],res)
      this.alertWrap
        .setMessage('Usuário cadastrado com sucesso')
        .setType('success')
        .show();
    }
  }

  OnError = (er:HttpErrorResponse)=>{
    const {error} = er;
    this.alertWrap
      .setMessage(error.message)
      .setType('danger')
      .show()
    
  }
}
