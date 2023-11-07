import { Pipe, PipeTransform } from '@angular/core';
import * as dateFnsLocale from 'date-fns/locale';
import { format } from 'date-fns';

@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  transform(date: string | undefined, formatString = 'dd MMMM'): string {
    if (!date) {
      return ''; // Retorna uma string vazia se a data for undefined
    }
    const localDate = this.adjustDateToUserTimezone(date);
    return this.formatDateWithLocale(localDate, formatString);
  }

  // Ajusta a data para o fuso horário do usuário (browser)
  private adjustDateToUserTimezone(date: string): Date {
    const dateObj = new Date(date);
    return dateObj;
  }

  // Formata a data de acordo com o locale do usuário (browser)
  private formatDateWithLocale(date: Date, formatString: string): string {
    const userLocale = 'ptBR';
    return format(date, formatString, { locale: dateFnsLocale[userLocale] });
  }
}
