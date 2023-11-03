import { Component } from '@angular/core';
import * as dateFnsLocale from 'date-fns/locale';
import { format } from 'date-fns';

@Component({
  selector: 'app-card-principal',
  templateUrl: './card-principal.component.html',
  styleUrls: ['./card-principal.component.scss'],
})
export class CardPrincipalComponent {
  IWeatherCard = {
    temperature: {
      celsius: {
        min: -15,
        max: 31,
        variation: 5.3,
      },
      fahrenheit: {
        min: 5,
        max: 86,
        variation: 5.3,
      },
    },
    terrestrialDate: '2023-09-23T00:00:00Z',
    solDate: 259,
  };

  formattedTerrestrialDate: string;

  constructor() {
    // Converter a data de string para um objeto Date
    const terrestrialDate = new Date(this.IWeatherCard.terrestrialDate);

    this.formattedTerrestrialDate = format(terrestrialDate, 'dd MMMM yyyy', {
      locale: dateFnsLocale.ptBR,
    }).replace(/ /g, ' de ');
  }
}
