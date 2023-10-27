import { Injectable } from "@angular/core";
import { BaseAPI } from './base.api';
import { HttpClient } from '@angular/common/http';
import { IResponsePasswordReset } from '../models/response-password-reset';

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordAPI extends BaseAPI{

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/forgot-password';
  }

  /**
   * password-reset
   *
   * Envia o email para o back
   */
  public passwordReset(emailForm: string): Promise<IResponsePasswordReset> {
    return this.post(emailForm);
  }
}



