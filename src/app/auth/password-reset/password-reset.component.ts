import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordAPI } from 'src/app/core/api/reset-password.api';
import { IResponsePasswordReset } from 'src/app/core/models/response-password-reset';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterModule,
  ],
})
export class PasswordResetComponent  implements OnInit{
  public errorMessage?: string;
  public emailForm: FormGroup;
  public email!: string;
  constructor(
    private resetPasswordAPI: ResetPasswordAPI,
    private router: Router,
    private loaderService: LoaderService,
    private modalService: ModalService,
    private emailService: EmailService
    ) {
      this.emailForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      })
    }

  public ngOnInit(): void {
    this.initializeForm();
  }
  
    /**
   * Inicializa o formulário, preenchendo o campo de e-mail com o valor armazenado no serviço EmailService.
   */
  private initializeForm(): void {
    const storedEmail = this.emailService.getEmail();
    if (storedEmail) {
      this.emailForm.patchValue({ email: storedEmail });
    }
  }

  /**
   * Navega de volta para a página de login.
   */
  public goBack(): void{
    this.router.navigate(['/login']);
  }
  
  /**
 * Manipula o envio do formulário de redefinição de senha.
 * Este método chama a API de redefinição de senha e exibe um diálogo de sucesso ou captura erros.
 */
  public onSubmit(): void {
    this.loaderService.setLoading(true);
    this.resetPasswordAPI.passwordReset(this.emailForm.value).then((response: IResponsePasswordReset) => {
      this.modalService.showSuccessDialog(response.message);
    }).catch((error) => {
      this.errorMessage = error;
    })
    .finally(() => {
      this.loaderService.setLoading(false);
    });
  }
}
