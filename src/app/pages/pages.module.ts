import { SwiperModule } from 'swiper/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { MarsWeatherPanelComponent } from './mars-weather-panel/mars-weather-panel.component';
import { LogoutComponent } from '../theme/components/logout/logout.component';
import { PageTitleComponent } from '../theme/components/page-title/page-title.component';
import { CarouselComponent } from '../theme/components/carousel/carousel.component';
import { DatePipe } from '../core/common/pipes/date.pipe';
import { CardPrincipalComponent } from '../theme/components/card-principal/card-principal.component';

@NgModule({
  declarations: [
    LoadingComponent,
    MarsWeatherPanelComponent,
    LogoutComponent,
    PageTitleComponent,
    CardPrincipalComponent,
    CarouselComponent,
    DatePipe,
  ],
  imports: [CommonModule, PagesRoutingModule, SwiperModule],
})
export class PagesModule {}
