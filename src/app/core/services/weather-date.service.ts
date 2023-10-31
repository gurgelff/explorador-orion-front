import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
// weatherService.ts
export class WeatherService {
  static formatBrazilianDate(isoString: string): string {
    const terrestrialDate: Date = new Date(isoString);
    const date = terrestrialDate.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    // Remover o primeiro 'de' e os espaços
    const dateWithoutDe = date.replace('de', '').replace(' ', '');
    return dateWithoutDe;
  }
}
