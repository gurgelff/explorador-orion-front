import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestNewPass } from '../models/IRequestNewPass';
import { IResponsePasswordForgot } from '../models/IResponsePasswordForgot';
import { StorageService } from '../services/storage.service';
import { BaseAPI } from './base.api';

@Injectable({
  providedIn: 'root',
})
export class NewPasswordApi extends BaseAPI {
  constructor(
    protected override httpClient: HttpClient,
    protected override storageService: StorageService
  ) {
    super(httpClient, storageService);
    this.apiUrl += '/reset-password';
  }

  /**
   * Faz o POST na rota /reset-password
   * @param userData Json contendo as senhas para fazer o POST na rota reset/password
   * @returns Uma promise contendo a resposta da rota
   */
  public newPassRequest(userData: IRequestNewPass): Promise<IResponsePasswordForgot> {
    return this.post(userData);
  }
  
  /**
   * Verifica através de um GET na rota /reset-password/:id/:resetToekn
   * se o id e o resetToken sao validos
   * @param id ID do usuário a ser verificado
   * @param resetToken Token a ser verificado
   * @returns Uma promise contendo a resposta da rota
   */
  public tokenVerify(id: string, resetToken: string): Promise<IResponsePasswordForgot> {
    return this.get(`/${id}/${resetToken}`);
  }
}
