import { Component, Input } from '@angular/core';
import { IWeatherCard } from '../../../core/models/IWeatherCard';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EnumVariation } from 'src/app/core/common/enums/enum.variation';

@Component({
  selector: 'app-card-principal',
  templateUrl: './card-principal.component.html',
  styleUrls: ['./card-principal.component.scss'],
})
export class CardPrincipalComponent {
  @Input() public weatherCard!: IWeatherCard;

  constructor(private sanitizer: DomSanitizer) {}

  public getTemperature(temperature: 'max' | 'min'): SafeHtml {
    const currentVariation =
      temperature === 'max'
        ? this.weatherCard.temperature.celsius.max.variation
        : this.weatherCard.temperature.celsius.min.variation;

    if (currentVariation === EnumVariation.NEUTRAL) {
      return '';
    }

    const rotation =
      currentVariation === EnumVariation.HIGHER
        ? 'rotate(180 8.5 5.5)'
        : 'rotate(0 8.5 5.5';
    const fill =
      currentVariation === EnumVariation.HIGHER ? '#FF0000' : '#00FF00';

    const svgElement = `<svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="caret-down-outline 1" transform="${rotation}">
        <path
          id="Vector"
          d="M3.44535 6.68183L8.35949 12.4165C8.4387 12.5089 8.53696 12.5831 8.64753 12.6339C8.75809 12.6848 8.87834 12.7111 9.00004 12.7111C9.12173 12.7111 9.24199 12.6848 9.35255 12.6339C9.46312 12.5831 9.56138 12.5089 9.64059 12.4165L14.5547 6.68183C15.0237 6.13445 14.6349 5.28894 13.9142 5.28894H4.08449C3.36379 5.28894 2.97496 6.13445 3.44535 6.68183Z"
          fill="${fill}"
        />
      </g>
    </svg>`;

    return this.sanitizer.bypassSecurityTrustHtml(svgElement);
  }
}
