import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCountries() {
    return Country.getAllCountries();
  }

  getStates(countryCode: string) {
    return State.getStatesOfCountry(countryCode);
  }

  getCities(countryCode: string, stateCode: string) {
    return City.getCitiesOfState(countryCode, stateCode);
  }
}
