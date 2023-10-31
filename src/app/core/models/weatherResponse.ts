import { WeatherData } from './weatherData';

export interface WeatherResponse {
  status: boolean;
  data: WeatherData;
}
