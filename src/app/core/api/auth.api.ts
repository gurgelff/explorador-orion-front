import { Injectable } from "@angular/core";
import { environment } from "src/app/environments/environment";
import { IRequestLogin } from "../models/request-login";
import { IResponseLogin } from "../models/response-login";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthAPI {

  apiUrl: string = environment.apiUrl + '/login';
  
  constructor(private httpClient: HttpClient){}

  /**
   * login
   *
   * Realiza o login
   *
   * @param data - Objeto com os dados para autenticação
   *
   * @returns Resposta da autenticação
   */
  public login(requestLogin: IRequestLogin): Observable<IResponseLogin>{
    return this.httpClient.post<IResponseLogin>(`${this.apiUrl}`, requestLogin)
  }

}
