import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const loginURL = state.url === '/login';
    const signUpURL = state.url === '/signup';
    const authURL = loginURL || signUpURL;

    const authorized = this.authService.hasUser();
    if (authorized) {
      if (authURL) {
        this.router.navigate(['/my-ideas']);
        return false;
      } else {
        return true;
      }
    } else {
      if (authURL) {
        return true;
      } else {
        this.router.navigate(['/signup']);
        return false;
      }
    }
  }
}
