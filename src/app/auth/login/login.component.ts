import { StorageService } from './../../core/services/storage.service';
import { AuthAPI } from '../../core/api/auth.api';
import { Router } from '@angular/router';
import { IRequestLogin } from './../../core/models/request-login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  requestLogin: IRequestLogin = {
    email: '',
    password: ''
  };
  public showError!: boolean;
  public errorMessage!: string;

  constructor(
    private authAPI: AuthAPI,
    private storageService: StorageService,
    private router: Router
  ){}

  /**
 * Tenta efetuar o login.
 * SUCESSO = Navega para pages.
 * FALHA = Exibe mensagem de erro.
 */
  public login(): void {
    if (this.requestLogin) {
      this.authAPI.login(this.requestLogin).subscribe(
        data => {
          this.router.navigate(['/pages']);
          this.storageService.setItem('token', data.data.token);
        },
        error => {
          this.showError = true;
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  
  
}
