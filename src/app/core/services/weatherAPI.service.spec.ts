/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherAPIService } from './weatherAPI.service';

describe('Service: WeatherAPI', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherAPIService]
    });
  });

  it('should ...', inject([WeatherAPIService], (service: WeatherAPIService) => {
    expect(service).toBeTruthy();
  }));
});
