import { Component } from '@angular/core';
import { EnumVariation } from 'src/app/core/common/enums/enum.variation';

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
              variation: EnumVariation.HIGHER,
            },
            min: {
              value: minTemp,
              variation: EnumVariation.LOWER,
            },
          },
          fahrenheit: {
            max: {
              value: maxTemp,
              variation: EnumVariation.HIGHER,
            },
            min: {
              value: minTemp,
              variation: EnumVariation.LOWER,
            },
          },
        },
      };
    });
}
