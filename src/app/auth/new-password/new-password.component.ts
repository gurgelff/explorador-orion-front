import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { hasEnoughLetters, numbersValidation, passwordMatchValidator, specialLetterValidation, upperCaseValidation } from './customValidator/passMatch-Validator';

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
    RouterModule
  ],
})

export class NewPasswordComponent {
  formNewPassword: FormGroup;
  hideFirstPass = false;
  hideSecondPass = true;

  constructor(private router: Router) {
    this.router = router;
    this.formNewPassword = new FormGroup(
      {
        password: new FormControl(
          '',
          [
            hasEnoughLetters(),
            specialLetterValidation(),
            upperCaseValidation(),
            numbersValidation(),
          ],
        ),
        passConfirmation: new FormControl(
          '',
          [
            passwordMatchValidator()
          ]
        )
      },
    );
  }
  
  goBack() {
    console.log('1')
    this.router.navigate(['/login']);
  }

  getErrorMessage() {
    const isEmpty = this.formNewPassword.get('password')?.value !== '';
    const hasValidValue = this.formNewPassword.get('password')?.invalid;
    if (isEmpty || !hasValidValue) {
      return 'Preenchido de forma incorreta, tente novamente!';
    }

    return ''
  }
}