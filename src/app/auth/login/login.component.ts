import { StorageService } from './../../core/services/storage.service';
import { AuthAPI } from '../../core/api/auth.api';
import { Router } from '@angular/router';
import { IRequestLogin } from './../../core/models/request-login';
import { Component } from '@angular/core';
import { IResponseLogin } from 'src/app/core/models/response-login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../../core/services/loader.service';
import { EnumStorageType } from 'src/app/core/common/enums/enum.storage.type.enum';

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
  public rememberMe!: boolean;

  constructor(
    private authAPI: AuthAPI,
    private storageService: StorageService,
    private router: Router,
    private loaderService: LoaderService
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
 * SUCESSO = Navega para pages e guarda token de acordo com checkbox Lembrar de mim.
 * FALHA = Exibe mensagem de erro.
 */
  public login(): void {
    this.loaderService.setLoading(true);
    this.authAPI.login(this.requestLogin).then((response: IResponseLogin) => {
      this.storageService.setItem('token', response.data.token, this.rememberMe ? EnumStorageType.LOCAL : EnumStorageType.SESSION)
      this.router.navigate(['/pages']);
    }).catch((error) => {
      this.showError = true;
      this.errorMessage = error;
    })
    .finally(() => {
      this.loaderService.setLoading(false);
    });
  }
}
