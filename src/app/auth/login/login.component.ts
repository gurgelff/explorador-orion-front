import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public hide = true;

  loginForm: FormGroup;

  constructor(private http: HttpClient) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.nullValidator,
      ]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.nullValidator,
      ]),
      lembrar: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.http.post('/api/login', formData).subscribe(
        (response) => {
          console.log('Login bem-sucedido!', response);
        },
        (error) => {
          console.error('Login falhou. Verifique suas credenciais.', error);
        }
      );
    }
  }
}
