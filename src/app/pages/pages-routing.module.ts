import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarsWeatherPanelComponent } from './mars-weather-panel/mars-weather-panel.component';

const routes: Routes = [
  {
    path: 'mars-weather-panel',
    component: MarsWeatherPanelComponent,
  },
  { path: '', redirectTo: 'mars-weather-panel', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
