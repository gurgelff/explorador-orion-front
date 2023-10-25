import { NgIf } from '@angular/common';
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
import { Router } from '@angular/router';

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
  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router) {}

  public goBack(): void {
    this.router.navigate(['/login']);
  }

  public onSubmit(): void {
    this.router.navigate(['/pages']);
  }
}
