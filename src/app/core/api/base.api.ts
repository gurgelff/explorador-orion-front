import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { StorageService } from 'src/app/core/services/storage.service';

export class BaseAPI {
  protected apiUrl: string = environment.apiUrl;
  protected storageService: StorageService;

  constructor(protected httpClient: HttpClient) {
    this.storageService = new StorageService();
  }

  public setHeaders(): HttpHeaders['headers'] {
    const bearerToken = this.storageService.getItem('token');

    const headers: HttpHeaders['headers'] = {
      language: 'pt-br',
      ...(bearerToken && { authorization: `Bearer ${bearerToken}` }),
      'Content-Type': 'application/json',
    };

    return headers;
  }

  /**
   * Realiza uma requisição HTTP GET para a URL da API.
   *
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  public get<TR>(): Promise<TR> {
    const headers = this.setHeaders();

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
   * @returns Uma Promise com a resposta da API no resolve se a requisição for bem-sucedida, ou uma mensagem de erro no reject em caso de falha.
   */
  protected post<TD, TR>(data: TD): Promise<TR> {
    const headers = this.setHeaders();

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
