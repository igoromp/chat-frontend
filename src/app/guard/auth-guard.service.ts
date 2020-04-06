import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{
  
  constructor(
    private authService: AuthService,
    private router: Router
    ) { }
  
  
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    console.log('auth: CanActivate')
    if (!this.authService.isAuthenticated()) {
        this.router.navigate(['login']);
        return false;
    }
    return true;

  }

}
