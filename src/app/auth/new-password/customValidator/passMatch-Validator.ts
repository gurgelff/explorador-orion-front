import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control.parent;
    const password = formGroup?.get('password');
    const confirmPassword = formGroup?.get('passConfirmation');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: false };
    }

    return null;
  };
}

export function upperCaseValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control.parent;
    const password = formGroup?.get('password');

    if (!password?.value.match(/[A-Z]/)) {
      return { upperCaseError: true };
    }
    return null;
  };
}

export function specialLetterValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control.parent;
    const password = formGroup?.get('password');

    if (!password?.value.match(/[^A-Za-z0-9]/g)) {
      return { specialLetterError: true };
    }
    return null;
  }
}

export function numbersValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control.parent;
    const password = formGroup?.get('password');

    if (!password?.value.match(/[0-9]/g)) {
      return { numbersError: true };
    }
    return null;
  }
}

export function hasEnoughLetters(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control.parent;
    const password = formGroup?.get('password');

    if (!(password?.value.length >= 8)) {
      console.log(password?.value.length)
      return { passwordSizeError: true };
    }
    return null;
  }
}