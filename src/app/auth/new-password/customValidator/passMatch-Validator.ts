import { AbstractControl, ValidatorFn } from '@angular/forms';

export function noSpaces(): ValidatorFn {
  return (newPassFormControl: AbstractControl): { [key: string]: boolean} | null => {
    const formGroup = newPassFormControl.parent;    
    const password = formGroup?.get('password');

    if (password?.value.match(/\s/)) {
      return { noSpacesError: true };
    }
    
    return null;
  }
}

export function upperCaseValidation(): ValidatorFn {
  return (newPassFormControl: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = newPassFormControl.parent;
    const password = formGroup?.get('password');

    if (!password?.value.match(/[A-Z]/)) {
      return { upperCaseError: true };
    }

    return null;
  };
}

export function specialLetterValidation(): ValidatorFn {
  return (newPassFormControl: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = newPassFormControl.parent;
    const password = formGroup?.get('password');

    if (!password?.value.match(/[^A-Za-z0-9]/g)) {
      return { specialLetterError: true };
    }

    return null;
  }
}

export function numbersValidation(): ValidatorFn {
  return (newPassFormControl: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = newPassFormControl.parent;
    const password = formGroup?.get('password');

    if (!password?.value.match(/[0-9]/g)) {
      return { numbersError: true };
    }

    return null;
  }
}

export function hasEnoughLetters(): ValidatorFn {
  return (newPassFormControl: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = newPassFormControl.parent;
    const password = formGroup?.get('password');

    if (!(password?.value.length >= 8)) {
      return { passwordSizeError: true };
    }

    return null;
  }
}
