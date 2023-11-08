import { EnumVariation } from '../common/enums/enum.variation';

export interface IWeatherCard {
  temperature: {
    celsius: {
      min: {
        value: number;
        variation?: EnumVariation;
      };
      max: {
        value: number;
        variation?: EnumVariation;
      };
    };
    fahrenheit: {
      min: {
        value: number;
        variation?: EnumVariation;
      };
      max: {
        value: number;
        variation?: EnumVariation;
      };
    };
  };
  terrestrialDate: string;
  solDate: number;
}
