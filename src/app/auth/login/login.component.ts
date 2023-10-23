import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../../core/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public hide = true;
  public loginForm: FormGroup;

  constructor(private loaderService: LoaderService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.nullValidator,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.nullValidator,
      ]),
      remember: new FormControl(false),
    });
  }

  public onSubmit(): void {
    this.loaderService.setLoading(true);

    this.loaderService.setLoading(false);

    const response = { message: 'Login bem-sucedido!' };
    console.log('Login bem-sucedido!', response);

    this.router.navigate(['dashboard']);
  }
}
