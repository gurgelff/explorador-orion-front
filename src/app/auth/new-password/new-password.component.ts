import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumStorageType } from 'src/app/core/common/enums/enum.storage.type.enum';
import { IRequestNewPass } from 'src/app/core/models/request-password.reset';
import { IResponsePasswordReset } from 'src/app/core/models/response-password.reset';
import { StorageService } from 'src/app/core/services/storage.service';
import { ResetPasswordAPI } from '../../core/api/reset-password.api';
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
    private dataRouter: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private navRouter: Router,
    private loaderService: LoaderService,
    private resetPassApi: ResetPasswordAPI,
    private storageService: StorageService,
  ) {
    this.navRouter = navRouter;
    this.dataRouter = dataRouter;
    this.userId = this.dataRouter.snapshot.params['id'];
    this.resetToken = this.dataRouter.snapshot.params['reset-token'];

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

  passwordMatchValidator(formNewPassword: FormGroup): void {
    const password: string = formNewPassword?.get('password')?.value;
    const passConfirmation: string = formNewPassword?.get('passConfirmation')?.value;

    if (password === passConfirmation) {
      formNewPassword.get('passConfirmation')?.setErrors(null);
    } else {
      formNewPassword.get('passConfirmation')?.setErrors({ passwordMismatch: true });
    }
  }

  goBack(): void{
    this.navRouter.navigate(['/login']);
  }

  createRequestJson(): IRequestNewPass {
    const password: string = this.formNewPassword?.get('password')?.value.replace(/\s/g, "");
    const passConfirmation: string = this.formNewPassword?.get('passConfirmation')?.value.replace(/\s/g, "");
    const userData: IRequestNewPass = {
      token: this.resetToken, 
      id: parseInt(this.userId),
      password,
      confirmPassword: passConfirmation,
    }
    return userData;
  }

  newPassBtnRequest(): void{
    const userData = this.createRequestJson();
    
    // criar conexao com o backend    
    this.loaderService.setLoading(true);
    this.resetPassApi
      .passwordReset(userData)
        .then((response: IResponsePasswordReset) => {
        const storageType = EnumStorageType.LOCAL;
        this.storageService.setItem('token', response.message , storageType);
        this.navRouter.navigate(['/pages']);
      })
      .catch((error) => {
        this.errorMessage = error;
      })
      .finally(() => {
        this.loaderService.setLoading(false);
      });
  }

}