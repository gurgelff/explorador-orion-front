import { StorageService } from './../../core/services/storage.service';
import { AuthAPI } from '../../core/api/auth.api';
import { Router } from '@angular/router';
import { IRequestLogin } from './../../core/models/request-login';
import { Component } from '@angular/core';
import { IResponseLogin } from 'src/app/core/models/response-login';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public requestLogin: IRequestLogin;
  public hide = true;
  public showError!: boolean;
  public errorMessage!: string;
  public loginForm!: FormGroup;

  constructor(
    private authAPI: AuthAPI,
    private storageService: StorageService,
    private router: Router
  ){
    this.requestLogin = {email: '', password: ''};
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.nullValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.nullValidator,
      ]),
      remember: new FormControl(false),
    });
  }

  /**
 * Tenta efetuar o login.
 * SUCESSO = Navega para pages.
 * FALHA = Exibe mensagem de erro.
 */
  public login(): void {
    this.authAPI.login(this.requestLogin).then((data: IResponseLogin) => {
      this.router.navigate(['/pages']);
      this.storageService.setItem('token', data.data.token);
    }).catch((error) => {
      this.showError = true;
      this.errorMessage = error;
    });
  }
  
}
