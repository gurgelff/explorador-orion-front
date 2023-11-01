import { IWeatherData } from './IWeatherData';

export interface IWeatherResponse {
  status: boolean;
  data: IWeatherData;
}
