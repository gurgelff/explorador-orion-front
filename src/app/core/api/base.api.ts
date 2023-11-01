import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

export class BaseAPI {
  protected apiUrl: string = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {}

  /**
   * Realiza uma requisição HTTP GET para a URL da API.
   *
   * @param headers Os cabeçalhos da requisição.
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  protected get<TR>(headers?: HttpHeaders): Promise<TR> {
    return new Promise<TR>((resolve, reject) => {
      this.httpClient.get<TR>(this.apiUrl, { headers }).subscribe(
        (response: TR) => {
          resolve(response);
        },
        (error) => {
          reject(`${error.error.data?.message || 'Erro desconhecido'}`);
        }
      );
    });
  }

  /**
   * Realiza uma requisição HTTP POST para a URL da API.
   *
   * @param data Os dados a serem enviados na requisição.
   * @param headers Os cabeçalhos da requisição.
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  protected post<TD, TR>(data: TD, headers?: HttpHeaders): Promise<TR> {
    return new Promise<TR>((resolve, reject) => {
      this.httpClient.post<TR>(this.apiUrl, data, { headers }).subscribe(
        (response: TR) => {
          resolve(response);
        },
        (error) => {
          reject(`${error.error.data?.message || 'Erro desconhecido'}`);
        }
      );
    });
  }
}
