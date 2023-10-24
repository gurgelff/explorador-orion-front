import { StorageService } from './../../core/services/storage.service';
import { AuthAPI } from '../../core/api/auth.api';
import { Router } from '@angular/router';
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
  public hide = true;
  public errorMessage?: string;
  public loginForm: FormGroup;

  constructor(
    private authAPI: AuthAPI,
    private storageService: StorageService,
    private router: Router,
    private loaderService: LoaderService
  ){
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
      isRememberEnabled: new FormControl(false),
    });
  }

  /**
   * Realiza o processo de login.
   * - Define o token de acordo com a opção de "Lembrar de mim".
   * - Navega para pages em caso de sucesso.
   * - Exibe uma mensagem de erro em caso de falha.
   */
  public login(): void {
    this.loaderService.setLoading(true);
    this.authAPI.login(this.loginForm.value).then((response: IResponseLogin) => {
      this.storageService.setItem('token', response.data.token, this.loginForm.controls['isRememberEnabled']?.value ? EnumStorageType.LOCAL : EnumStorageType.SESSION)
      this.router.navigate(['/pages']);
    }).catch((error) => {
      this.errorMessage = error;
    })
    .finally(() => {
      this.loaderService.setLoading(false);
    });
  }
}
