export interface WeatherCard {
  temperature: {
    celsius: {
      min: number;
      max: number;
      variation?: number; // ex: -5.3 indica temperatura 5.3 graus menor que o dia anterior. Acima de 0 use seta vermelha para cima (temp maior), abaixo de 0 use seta verde para baixo, e caso 0 não mostrar nada.
    };
    fahrenheit: {
      min: number;
      max: number;
      variation?: number; // mesmo esquema
    };
  };
  terrestrialDate: string; // Formato ISO 8601
  solDate: number; // Inteiro
}
