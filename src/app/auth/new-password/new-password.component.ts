import { CommonModule, NgIf, } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPasswordApi } from 'src/app/core/api/new-password.api';
import { IRequestNewPass } from 'src/app/core/models/IRequestNewPass';
import { IResponsePasswordForgot } from 'src/app/core/models/IResponsePasswordForgot';
import { ModalService } from 'src/app/core/services/modal.service';
import { LoaderService } from '../../core/services/loader.service';
import { hasEnoughLetters, noSpaces, numbersValidation, specialLetterValidation, upperCaseValidation } from './customValidator/passMatch-Validator';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
  ],
})

export class NewPasswordComponent {
  public formNewPassword: FormGroup;
  public hideSecondPass = true;
  public specialCharTheme = '';
  public errorMessage = '';
  private resetToken = '';
  private userId = '';
  
  constructor(
    private activatedRouter: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private loaderService: LoaderService,
    private resetPassApi: NewPasswordApi,
    private modalService: ModalService
  ) {
    this.router = router;
    this.activatedRouter = activatedRouter;
    this.userId = this.activatedRouter.snapshot.params['id'];
    this.resetToken = this.activatedRouter.snapshot.params['reset-token'];

    this.formNewPassword = this.formBuilder.group({
      password: new FormControl(
        '',
        [
          noSpaces(),
          hasEnoughLetters(),
          specialLetterValidation(),
          upperCaseValidation(),
          numbersValidation(),
        ],
      ),
      passConfirmation: new FormControl('', []),
    }, {
      validators: this.passwordMatchValidator
    });
  }
  
  private ngOnInit(): void {
    this.loadScreen();
  }
  
  private loadScreen(): void {
    this.loaderService.setLoading(true);
    this.resetPassApi
      .tokenVerify(this.userId, this.resetToken)
      .catch((error) => {
        this.errorMessage = error;
        this.modalService.showSuccessDialog(this.errorMessage)
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }

  private passwordMatchValidator(formNewPassword: FormGroup): void {
    const password: string = formNewPassword?.get('password')?.value;
    const passConfirmation: string = formNewPassword?.get('passConfirmation')?.value;

    if (password === passConfirmation) {
      formNewPassword.get('passConfirmation')?.setErrors(null);
    } else {
      formNewPassword.get('passConfirmation')?.setErrors({ passwordMismatch: true });
    }
  }

  protected goBack(): void {
    this.router.navigate(['/login']);
  }

  private createRequestJson(): IRequestNewPass {
    const password: string = this.formNewPassword?.get('password')?.value.replace(/\s/g, "");
    const passConfirmation: string = this.formNewPassword?.get('passConfirmation')?.value.replace(/\s/g, "");
    const userData: IRequestNewPass = {
      resetToken: this.resetToken, 
      password,
      confirmPassword: passConfirmation,
      id: this.userId,
    }
    return userData;
  }

  protected newPassBtnRequest(): void {
    const userData = this.createRequestJson();
    this.loaderService.setLoading(true);
    this.resetPassApi
      .newPassRequest(userData)
        .then((response: IResponsePasswordForgot) => {
          this.modalService.showSuccessDialog(response.data.message)
      })
      .catch((error) => {
        this.errorMessage = error;
        this.modalService.showSuccessDialog(this.errorMessage)
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }
}