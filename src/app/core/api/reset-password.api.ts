import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { IRequestNewPass } from "../models/request-password.reset";
import { IResponsePasswordReset } from '../models/response-password.reset';
import { BaseAPI } from './base.api';

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordAPI extends BaseAPI<IRequestNewPass ,IResponsePasswordReset>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/forgot-password';
  }

  /**
   * password-reset
   *
   * Envia o email para o back
   * 
   * ??
   * 
   * Nao era pra enviar {token, id, password e confirmPassword} ?
   */
  public passwordReset(formRequest: IRequestNewPass): Promise<IResponsePasswordReset> {
    return this.post(formRequest);
  }
}



// // Corriir formato da resposta
// //corrigir endpoint
// //criar interface para resposta
// export class ResetPasswordAPI{

//     public passwordReset(email: string ): Promise<IResponsePasswordReset> {
//       return new Promise<IResponsePasswordReset>((resolve, reject) => {
//         const response: IResponsePasswordReset = {
//           success: false,
//           message: ''
//         };    
//         if (email) {
//           response.success = true;
//           response.message = 'E-mail de recuperação enviado com sucesso! Siga as instruções enviadas em seu e-mail.';
//           resolve(response);
//         } else {
//           reject(response);
//         }
//       });
//     }
    
//   }


