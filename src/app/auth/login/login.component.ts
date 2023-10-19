import { Router } from '@angular/router';
import { IRequestLogin } from './../../core/models/request-login';
import { AuthGuardService } from './../../core/services/auth-guard.service';
import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  requestLogin: IRequestLogin = {
    username: '',
    password: ''
  };

  mostrarErro!: boolean;
  mensagemErro!: string;

  constructor(
    private authGuardService: AuthGuardService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ){}

  tentarLogin(): void{
    this.authGuardService.tentarLogin(this.requestLogin).subscribe(
      data => {
        this.router.navigate(['/loading']);
        this.tokenStorageService.storeToken(data.access_token);
      },
      error => {
        this.mostrarErro = true;
        this.mensagemErro = error.error.message;
      }
    )    
  }
}
