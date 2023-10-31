import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weatherData';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherData: WeatherData | undefined; // Dados do clima

  // fetchWeatherData(): void {}

  getWeatherData(): WeatherData | null {
    if (this.weatherData === undefined) {
      return null;
    }
    return this.weatherData;
  }
}
