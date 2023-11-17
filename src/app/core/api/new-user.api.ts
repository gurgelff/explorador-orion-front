import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BaseAPI } from './base.api';
import { IRegisterResponse } from '../models/iRegisterResponse';
import { IRegisterRequestBody } from '../models/iRegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class NewUserAPI extends BaseAPI {
  constructor(
    protected override httpClient: HttpClient,
    protected override storageService: StorageService
  ) {
    super(httpClient, storageService);
    this.apiUrl += '/register';
  }

  /**
   * register
   *
   * Realiza o cadastro
   *
   * @param data - Objeto com os dados para cadastrar
   *
   * @returns Resposta da cadastro
   */
  public register(userData: IRegisterRequestBody): Promise<IRegisterResponse> {
    return this.post(userData);
  }
}
