import { Pipe, PipeTransform } from '@angular/core';
import * as dateFnsLocale from 'date-fns/locale';
import { format } from 'date-fns';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  /**
   * transform
   *
   * Transforma uma data em uma string formatada com base no local do usuário.
   *
   * @param date - Data a ser formatada como uma string.
   *
   * @returns Data formatada como uma string.
   */
  transform(date: string): string {
    const localDate = this.adjustDateToUserTimezone(date);
    return this.formatDateWithLocale(localDate);
  }

  /**
   * adjustDateToUserTimezone
   *
   * Converte uma string de data em um objeto Date e ajusta para o fuso horário do usuário.
   *
   * @param date - String de data a ser convertida.
   *
   * @returns Objeto Date ajustado para o fuso horário do usuário.
   */
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
   *
   * @returns Data formatada como uma string de acordo com o local do usuário.
   */
  private formatDateWithLocale(date: Date): string {
    const userLocale = 'ptBR';
    return format(date, 'dd MMMM', { locale: dateFnsLocale[userLocale] });
  }
}
