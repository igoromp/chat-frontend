import { AlertComponent } from './../../shared/alert/alert.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import  {  FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  isError:boolean;

  @ViewChild('alert') alert:AlertComponent;

  constructor(
    private router: Router, 
    private auth: AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(6)]]
    })
  }
 
  login() {
     this.auth.login(this.loginForm.value)
      .subscribe(this.onSuccess,this.onError)
  }
 
  onSuccess = (res)=>{
    if ( res ){
      this.router.navigate(['/chat']);
    }
  } 

  onError = ( {error}) => {
      const {message} = error;
      this.alert.setMessage(message)
        .setType('danger')
        .show();
  }

  openChat() {
       this.auth.login(this.loginForm.value)
      if ( this.auth.isAuthenticated() ) {
        this.router.navigate(['/chat']);
        return;
      } else {
        alert('usuário ou senha incorreta!');
      }
  }
}
