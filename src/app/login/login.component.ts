import { AuthService } from './../auth/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import  { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup ({
    name : new FormControl(''),
    password : new FormControl('')
  })
 

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

  }
 
  /* @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.keyCode === 13 ){
        
    }
  } */

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
