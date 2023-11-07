import { Pipe, PipeTransform } from '@angular/core';
import * as dateFnsLocale from 'date-fns/locale';
import { format } from 'date-fns';

@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  /**
   * transform
   *
   * Transforma uma data em uma string formatada com base no local do usuário.
   *
   * @param date - Data a ser formatada como uma string.
   * @param formatString - Formato personalizado da data (opcional).
   *
   * @returns Data formatada como uma string.
   */
  transform(date: string, formatString = 'dd MMMM'): string {
    const localDate = this.adjustDateToUserTimezone(date);
    return this.formatDateWithLocale(localDate, formatString);
  }
  private adjustDateToUserTimezone(date: string): Date {
    const dateObj = new Date(date);
    return dateObj;
  }

  /**
   * formatDateWithLocale
   *
   * Formata uma data com base no local do usuário e retorna a representação da data como uma string.
   *
   * @param date - Objeto Date a ser formatado.
   * @param formatString - Formato personalizado da data.
   *
   * @returns Data formatada como uma string de acordo com o local do usuário.
   */
  private formatDateWithLocale(date: Date, formatString: string): string {
    const userLocale = 'ptBR';
    return format(date, formatString, { locale: dateFnsLocale[userLocale] });
  }
}
