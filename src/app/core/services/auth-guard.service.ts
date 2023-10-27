import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  /*
  Verifica se o usuário está autenticado antes de permitir o acesso a uma rota.
  Se não estiver, redireciona para tela de login 
  */
  public canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    if (this.storageService.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['auth'], { replaceUrl: true });
      return false;
    }
  }
}
