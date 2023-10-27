import { Injectable } from '@angular/core';
import { BaseAPI } from './base.api';
import { HttpClient } from '@angular/common/http';
import { IResponsePasswordForgot } from '../models/response-password-forgot';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordAPI extends BaseAPI {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/forgot-password';
  }

  /**
   * Solicita uma redefinição de senha para o endereço de e-mail fornecido.
   *
   * @param emailForm O endereço de e-mail para o qual a redefinição de senha será solicitada.
   * @returns Uma Promise com a resposta da solicitação de redefinição de senha.
   */
  public passwordReset(emailForm: string): Promise<IResponsePasswordForgot> {
    return this.post(emailForm);
  }
}
