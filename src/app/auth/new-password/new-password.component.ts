import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../password-reset/components/button/button.components';
import { hasEnoughLetters, numbersValidation, passwordMatchValidator, specialLetterValidation, upperCaseValidation } from './customValidator/passMatch-Validator';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgIf, 
    ButtonComponent, 
    RouterModule
  ],
})

export class NewPasswordComponent {

  control = new FormGroup(
    {
      password: new FormControl(
        '',
        [
          Validators.required,
          hasEnoughLetters(),
          specialLetterValidation(),
          upperCaseValidation(),
          numbersValidation(),
        ],
      ),
      passConfirmation: new FormControl(
        '',
        [
          Validators.required,
          passwordMatchValidator()
        ]
      )
    },
  );
  
  goBack() {
    console.log(this.control)
    console.log('go back');
  }

}