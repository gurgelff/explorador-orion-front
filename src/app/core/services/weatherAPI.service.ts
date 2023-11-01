import { Injectable } from '@angular/core';
import { BaseAPI } from '../api/base.api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService extends BaseAPI {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/weather';
  }
}
