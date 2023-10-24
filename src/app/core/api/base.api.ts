import { HttpClient } from "@angular/common/http";
import { environment } from "src/app/environments/environment";

export class BaseAPI<TD, TR> {
  protected apiUrl: string = environment.apiUrl;

  constructor(protected httpClient: HttpClient) { }

  protected post(data: TD): Promise<TR> {
    return new Promise<TR>((resolve, reject) => {
      this.httpClient.post<TR>(this.apiUrl, data)
        .subscribe(
          (response: TR) => {
            resolve(response);
          },
          (error) => {
            reject(`${error.error.data.message || 'Erro desconhecido'}`);
          }
        );
    });
  }

}