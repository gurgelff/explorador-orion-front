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

  public newPassRequest(userData: IRequestNewPass): Promise<IResponsePasswordForgot> {
    return this.post(userData);
  }
  
  public tokenVerify(id: string, resetToken: string): Promise<IResponsePasswordForgot> {
    return this.get(`/${id}/${resetToken}`);
  }
}
