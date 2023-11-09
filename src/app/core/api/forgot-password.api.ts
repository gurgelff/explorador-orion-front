import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponsePasswordForgot } from '../models/IResponsePasswordForgot';
import { StorageService } from '../services/storage.service';
import { BaseAPI } from './base.api';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordAPI extends BaseAPI {
  constructor(
    protected override httpClient: HttpClient,
    protected override storageService: StorageService
  ) {
    super(httpClient, storageService);
    this.apiUrl += '/forgot-password';
  }

  /**
   * Solicita uma redefinição de senha para o endereço de e-mail fornecido.
   *
   * @param emailForm O endereço de e-mail para o qual a redefinição de senha será solicitada.
   * @returns Uma Promise com a resposta da solicitação de redefinição de senha.
   */
  public async passwordReset(
    emailForm: string
  ): Promise<IResponsePasswordForgot> {
    return this.post({ email: emailForm });
  }
}
