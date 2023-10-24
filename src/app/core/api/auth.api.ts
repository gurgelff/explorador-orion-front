import { IResponseLogin } from './../models/response-login';
import { Injectable } from "@angular/core";
import { BaseAPI } from './base.api';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthAPI extends BaseAPI<FormGroup, IResponseLogin> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/login';
  }

  /**
   * login
   *
   * Realiza o login
   *
   * @param data - Objeto com os dados para autenticação
   *
   * @returns Resposta da autenticação
   */
  public login(loginForm: FormGroup): Promise<IResponseLogin> {
    return this.post(loginForm);
  }
  
}
