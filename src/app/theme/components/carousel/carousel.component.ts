import { Component } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './carousel.component.scss',
  ],
})
export class CarouselComponent {
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

  @ViewChild('sliderRef') sliderRef?: ElementRef<HTMLElement>;

  public slider?: KeenSliderInstance;
  public hideLeftArrow = false;
  public hideRightArrow = true;

  public ngAfterViewInit(): void {
    this.slider = new KeenSlider('.keen-slider', {
      slides: {
        perView: 5,
        spacing: 24,
      },
      dragStarted: () => {
        this.toggleArrowVisibility();
      },
      dragEnded: () => {
        this.toggleArrowVisibility();
      },
    });

    this.toggleArrowVisibility();
  }

  public toggleArrowVisibility(): void {
    if (this.slider) {
      const slideProgress = this.slider.track.details.progress;
      this.hideLeftArrow = slideProgress > 0.1;
      this.hideRightArrow = slideProgress < 0.95;
    }
  }
}
