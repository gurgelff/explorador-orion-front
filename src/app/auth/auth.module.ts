import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './password-reset/components/button/button.components';
import { PasswordResetComponent } from './password-reset/password-reset.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    [PasswordResetComponent, ButtonComponent],
    AuthRoutingModule
  ]
})

export class AuthModule { }
