import { Injectable } from '@angular/core';
import { BaseAPI } from '../api/base.api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IWeatherResponse } from '../models/weatherResponse';

@Injectable({
  providedIn: 'root',
})
export class WeatherAPIService extends BaseAPI {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiUrl += '/weather';
  }

  public getWeatherByCity(): Promise<IWeatherResponse> {
    const headers = new HttpHeaders();
    headers.set('X-API-Key', 'YOUR_API_KEY');

    return this.get<IWeatherResponse>(headers);
  }
}
