import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

export class BaseAPI {
  protected apiUrl: string = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {}

  /**
   * Realiza uma requisição HTTP POST para a URL da API.
   *
   * @param data Os dados a serem enviados na requisição.
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  protected post<TD, TR>(data: TD): Promise<TR> {
    return new Promise<TR>((resolve, reject) => {
      this.httpClient.post<TR>(this.apiUrl, data).subscribe(
        (response: TR) => {
          resolve(response);
        },
        (error) => {
          reject(`${error?.message || 'Erro desconhecido'}`);
        }
      );
    });
  }
}
