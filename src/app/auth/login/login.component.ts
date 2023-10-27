import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumStorageType } from 'src/app/core/common/enums/enum.storage.type.enum';
import { IResponseLogin } from 'src/app/core/models/response-login';
import { EmailService } from 'src/app/core/services/email.service';
import { AuthAPI } from '../../core/api/auth.api';
import { LoaderService } from '../../core/services/loader.service';
import { StorageService } from './../../core/services/storage.service';

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
    private loaderService: LoaderService,
    @Inject(EmailService) private emailService: EmailService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      isRememberEnabled: new FormControl(false),
    });
  }

  /**
   * Realiza o processo de login.
   * - Define o token de acordo com a opção de "Lembrar de mim".
   * - Navega para 'pages' em caso de sucesso.
   * - Exibe uma mensagem de erro em caso de falha.
   */
  public login(): void {
    this.loaderService.setLoading(true);
    this.authAPI
      .login(this.loginForm.value)
      .then((response: IResponseLogin) => {
        const storageType = this.loginForm.get('isRememberEnabled')?.value
          ? EnumStorageType.LOCAL
          : EnumStorageType.SESSION;
        this.storageService.setItem('token', response.data.token, storageType);
        this.router.navigate(['/pages']);
      })
      .catch((error) => {
        this.errorMessage = error;
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }

  /**
   * Método chamado quando o usuário clica em "Esqueceu a senha?".
   * - Obtém o valor do campo de e-mail do formulário.
   * - Armazena o valor do e-mail no serviço EmailService para uso posterior.
   * - Navega para a rota '/auth/password-reset' para permitir a redefinição da senha.
   */
  public forgotPassword(): void {
    this.emailService.setEmail(this.loginForm.get('email')?.value);
    this.router.navigate(['/auth/password-reset']);
  }
}
