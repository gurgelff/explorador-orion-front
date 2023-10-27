import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IRequestNewPass } from "../models/request-password.reset";
import { IResponsePasswordReset } from '../models/response-password.reset';
import { BaseAPI } from './base.api';

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordAPI extends BaseAPI{

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/reset-password';
  }

  /**
   * reset-password
   *
   * Envia as senhas para o back
   * 
   */
  public passwordReset(formRequest: IRequestNewPass): Promise<IResponsePasswordReset> {
    return this.post(formRequest);
  }
}



