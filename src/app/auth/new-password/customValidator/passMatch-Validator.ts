import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Valida se existe algum espaço dentro do campo de password
 */
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

/**
 * Valida se existe pelo menos uma letra maiuscula
 */
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

/**
 * Valida se existe pelo menos um caractere especial
 */
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

/**
 * Valida se existe pelo menos um número
 */
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

/**
 * Valida se a senha contém pelo menos 8 caracteres
 */
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
