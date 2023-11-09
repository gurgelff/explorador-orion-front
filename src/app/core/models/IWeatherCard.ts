export interface IWeatherCard {
  temperature: {
    celsius: {
      min: {
        value: number;
        variation?: number;
      };
      max: {
        value: number;
        variation?: number;
      };
    };
    fahrenheit: {
      min: {
        value: number;
        variation?: number;
      };
      max: {
        value: number;
        variation?: number;
      };
    };
  };
  terrestrialDate: string;
  solDate: number;
}
