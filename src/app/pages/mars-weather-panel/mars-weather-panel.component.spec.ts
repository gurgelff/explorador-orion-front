import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarsWeatherPanelComponent } from './mars-weather-panel.component';

describe('MarsWeatherPanelComponent', () => {
  let component: MarsWeatherPanelComponent;
  let fixture: ComponentFixture<MarsWeatherPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarsWeatherPanelComponent]
    });
    fixture = TestBed.createComponent(MarsWeatherPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
