import { Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

/** @title Form field with error messages */
@Component({
  selector: 'app-password-reset',
  templateUrl: 'password-reset.component.html',
  styleUrls: ['password-reset.component.scss'],
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
  constructor(private location: Location) {
    this.location = location;
  }

  public email = new FormControl('', [Validators.required, Validators.email]);
  public submitBtnBool = !this.email.hasError('required') || false;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goBack(): void {
    this.location.back();
  }

  submit(): void {
    console.log('fdsuhf');
    this.location.back();
  }
}
