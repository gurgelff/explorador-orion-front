import { Component } from '@angular/core';

@Component({
  selector: 'app-mars-weather-panel',
  templateUrl: './mars-weather-panel.component.html',
  styleUrls: ['./mars-weather-panel.component.scss'],
})
export class MarsWeatherPanelComponent {
  weatherCards = Array(14)
    .fill(null)
    .map((_, index) => {
      const solDate = 3991 + index;
      const terrestrialDate = '2023-10-28';
      const maxTemp = -13 + index;
      const minTemp = -77 + index;

      return {
        solDate: solDate,
        terrestrialDate,
        temperature: {
          celsius: {
            max: {
              value: maxTemp,
              variation: 0,
            },
            min: {
              value: minTemp,
              variation: 0,
            },
          },
          fahrenheit: {
            max: {
              value: maxTemp,
              variation: 0,
            },
            min: {
              value: minTemp,
              variation: 0,
            },
          },
        },
      };
    });
}
