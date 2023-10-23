import { IResponseLogin } from './../models/response-login';
import { Injectable } from "@angular/core";
import { IRequestLogin } from './../models/request-login';
import { BaseAPI } from './base.api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthAPI extends BaseAPI<IRequestLogin, IResponseLogin> {

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
  public login(requestLogin: IRequestLogin): Promise<IResponseLogin> {
    return this.post(requestLogin);
  }
  
}
