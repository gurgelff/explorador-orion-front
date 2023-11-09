import { Pipe, PipeTransform } from '@angular/core';
import * as dateFnsLocale from 'date-fns/locale';
import { format } from 'date-fns';

@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  /**
   * Transforma a data fornecida em uma string formatada de acordo com o formato especificado.
   *
   * @param date - A data de entrada a ser formatada.
   * @param formatString - Uma string de formato que determina como a data deve ser exibida.
   * @returns A data formatada como uma string.
   */
  transform(date: string | undefined, formatString = 'dd MMMM'): string {
    if (!date) {
      return '';
    }
    const localDate = this.adjustDateToUserTimezone(date);
    return this.formatDateWithLocale(localDate, formatString);
  }

  /**
   * Converte a data de entrada em um objeto de data considerando o fuso horário do usuário.
   *
   * @param date - A data de entrada a ser convertida.
   * @returns A data convertida para o fuso horário do usuário.
   * @private
   */
  private adjustDateToUserTimezone(date: string): Date {
    const dateObj = new Date(date);
    return dateObj;
  }

  /**
   * Formata a data fornecida de acordo com o formato especificado e o idioma do usuário.
   *
   * @param date - A data a ser formatada.
   * @param formatString - Uma string de formato que determina como a data deve ser exibida.
   * @returns A data formatada como uma string.
   * @private
   */
  private formatDateWithLocale(date: Date, formatString: string): string {
    const userLocale = 'ptBR';
    return format(date, formatString, { locale: dateFnsLocale[userLocale] });
  }
}
