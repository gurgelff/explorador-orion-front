import { Component, Input } from '@angular/core';
import { IWeatherCard } from '../../../core/models/IWeatherCard';

@Component({
  selector: 'app-card-principal',
  templateUrl: './card-principal.component.html',
  styleUrls: ['./card-principal.component.scss'],
})
export class CardPrincipalComponent {
  @Input() public weatherCard: IWeatherCard | undefined = undefined;
  @Input() public previousDayTemperature: number | undefined = undefined; // Recebe a temperatura do dia anterior

  evaluateTemperature(): string {
    // Verifica se o objeto de dados do tempo e a temperatura do dia anterior estão definidos
    if (this.weatherCard && this.previousDayTemperature !== undefined) {
      const currentTemperature = this.weatherCard.temperature.celsius.max.value;

      // Compara a temperatura atual com a do dia anterior e retorna um rótulo
      return currentTemperature > this.previousDayTemperature
        ? 'Greater'
        : currentTemperature < this.previousDayTemperature
        ? 'Less'
        : 'Equal';
    }

    return 'Undefined';
  }
}
