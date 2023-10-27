import { Injectable } from "@angular/core";
import { BaseAPI } from './base.api';
import { HttpClient } from '@angular/common/http';
import { IResponsePasswordReset } from '../models/response-password-reset';

@Injectable({
  providedIn: 'root'
})

export class ResetPasswordAPI extends BaseAPI{

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/forgot-password';
  }

  /**
   * password-reset
   *
   * Envia o email para o back
   */
  public passwordReset(emailForm: string): Promise<IResponsePasswordReset> {
    return this.post(emailForm);
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



