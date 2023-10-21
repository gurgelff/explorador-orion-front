import { Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PasswordChangeMockService } from 'src/app/services/password-reset-mock.component';
import { ButtonComponent } from './components/button/button.components';

/** @title Form field with error messages */
@Component({
  selector: 'app-password-reset',
  templateUrl: 'password-reset.component.html',
  styleUrls: ['password-reset.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, ButtonComponent, RouterModule, ],
})

export class PasswordResetComponent {
  constructor(private location: Location, private passwordChangeService: PasswordChangeMockService) {}

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goBack(): void {
    this.location.back();
  }
  
  changePassword() {
    const formData = {}; // Get the form data here
    this.passwordChangeService.changePassword(formData).subscribe((response) => {
      console.log(response); 
      this.goBack();
    });
  }
}
