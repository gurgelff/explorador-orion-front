import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordAPI } from 'src/app/core/api/reset-password.api';
import { IResponseLogin } from 'src/app/core/models/response-login';
import { IResponsePasswordReset } from 'src/app/core/models/response-password-reset';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DialogComponent } from 'src/app/theme/components/dialog/dialog.component';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  emailForm: FormGroup;
    
  public errorMessage?: string;
  
  constructor(
    private resetPasswordAPI: ResetPasswordAPI,
    private router: Router,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
    ) {
      this.emailForm = this.formBuilder.group({
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.nullValidator,
        ])
      });
    }

  public submit(): void {
    this.loaderService.setLoading(true);
    this.resetPasswordAPI.passwordReset(this.emailForm.value).then((response: IResponsePasswordReset) => {
      this.showSuccessDialog(response.message);
    }).catch((error) => {
      this.errorMessage = error;
    })
    .finally(() => {
      this.loaderService.setLoading(false);
    });
  }
  
  showSuccessDialog(response: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { response: response } 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }
}
