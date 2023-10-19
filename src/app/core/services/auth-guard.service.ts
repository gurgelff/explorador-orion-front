import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Injectable } from '@angular/core';
import { IRequestLogin } from '../models/request-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseLogin } from '../models/response-login';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  apiUrl: string = environment.apiUrl + '/auth/login';
  
  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService
    ) { }

  tentarLogin(requestLogin: IRequestLogin): Observable<IResponseLogin>{
    return this.httpClient.post<IResponseLogin>(`${this.apiUrl}`, requestLogin)
  }

  usuarioAutenticado(): boolean {
    if (this.tokenStorageService.getToken()) {
      return true;
    } else {
      return false;
    }
  }
}
