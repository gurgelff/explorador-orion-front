import { IWeatherData } from './weatherData';

export interface IWeatherResponse {
  status: boolean;
  data: IWeatherData;
}
