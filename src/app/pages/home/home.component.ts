import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('cardsAnimations', [
      transition('void => *', [
        query('.mars-cards', style({ transform: 'translateY(100%)'})),
        query('.mars-cards',
          stagger('600ms', [
            animate('600ms', style({ transform: 'translateY(0)'}))
          ])
        )
      ]),
    ]),
  ]
})

export class HomeComponent {

  constructor(private router: Router) {}

  /**
   * Leva o usuário para a tela de meteorologia
   * Usado no card de meteorologia
   */
  public onClick(): void {
    this.router.navigate(['/pages/mars-weather-panel']);
  }

  /**
   * Usado em qualquer botão, para redirecionar o usuário para 
   * alguma página fora do aplicativo por exemplo http://www.google.com
   * @param url Stirng contendo a url completa do site destino
   */
  public openNewTab(url: string): void {
    window.open(url, '_blank');
  }
}
