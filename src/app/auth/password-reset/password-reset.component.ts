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
  // private router: any;

  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    console.log('clicked');
    // this.router.navigate(['/path']);
  }
}
