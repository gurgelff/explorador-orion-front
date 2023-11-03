import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import SwiperCore, {
  Navigation,
  Scrollbar,
  A11y,
  Pagination,
  SwiperOptions,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([Pagination, Navigation, Scrollbar, A11y]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements AfterViewInit {
  cards = [
    ...Array(14)
      .fill(null)
      .map((_, index) => {
        const currentTitle = 260 + index;
        const currentDate = 10 + index + ' Setembro';
        const maxTemp = -17 + (index % 3) + '° F';
        const minTemp = -150 + (index % 3) + '° F';

        return {
          title: `SOL ${currentTitle}`,
          date: currentDate,
          maxTemp: `Máx.: ${maxTemp}`,
          minTemp: `Mín.: ${minTemp}`,
        };
      }),
  ];

  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 24,
  };

  @ViewChild(SwiperComponent) swiperComponent?: SwiperComponent;

  /**
   * Chama `updateArrowVisibility` inicialmente para garantir que as setas sejam exibidas ou ocultadas corretamente.
   * Configura dois ouvintes de eventos no objeto Swiper para controlar a visibilidade das setas de navegação.
   */
  public ngAfterViewInit(): void {
    this.updateArrowVisibility();
    this.swiperComponent?.swiperRef.on(
      'slideChange',
      this.updateArrowVisibility.bind(this)
    );
  }

  /**
   * Atualiza a visibilidade das setas de navegação com base na posição do Swiper.
   * Verifica se o Swiper atingiu o início ou o final do carrossel para ajustar a visibilidade das setas.
   */
  public updateArrowVisibility(): void {
    const swiper = this.swiperComponent?.swiperRef;
    const arrowLeft = document.querySelector('.arrow-left') as HTMLElement;
    const arrowRight = document.querySelector('.arrow-right') as HTMLElement;

    arrowLeft.style.visibility = swiper?.isBeginning ? 'hidden' : 'visible';
    arrowRight.style.visibility = swiper?.isEnd ? 'hidden' : 'visible';
  }
}
