import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResetPasswordAPI } from 'src/app/core/api/reset-password.api';
import { IResponsePasswordReset } from 'src/app/core/models/response-password-reset';
import { LoaderService } from 'src/app/core/services/loader.service';
import { DialogComponent } from 'src/app/theme/components/dialog/dialog.component';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

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
export class PasswordResetComponent {

  emailForm!: FormControl;
    
  public errorMessage?: string;
  

  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private resetPasswordAPI: ResetPasswordAPI,
    private router: Router,
    private loaderService: LoaderService,
    public dialog: MatDialog,
    ) {}

  public goBack(): void {
    this.router.navigate(['/login']);
  }

  public onSubmit(): void {
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

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
