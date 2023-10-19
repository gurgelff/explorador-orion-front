import { AuthGuardService } from '../core/services/auth-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingGuard implements CanActivate {
    constructor(
        private authGuardService: AuthGuardService, 
        private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.authGuardService.usuarioAutenticado()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}