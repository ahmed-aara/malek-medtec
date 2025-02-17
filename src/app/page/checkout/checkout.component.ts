import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as libphonenumber from 'libphonenumber-js';
import { LocationService } from 'src/app/services/location.service';
import { Observable } from 'rxjs';
import { cart, total } from 'src/app/redux/data.actions';
import { environment } from 'src/environments/environment.prod';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  //Redux
  cartArr$: Observable<any>;
  total$: Observable<any>;

  //Variable
  img_url: any = environment.api_url
  isValidNumber: boolean | null = null;
  selectedCountry: string = '';
  selectedState: string = '';
  selectedCity: string = '';
  paymentType: string = 'online-payment';

  // Array
  countries: any[] = [];
  states: any[] = [];

  //Form
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private store: Store<{ cart: any, total: any }>,
    private locationService: LocationService
  ) {
    this.cartArr$ = store.pipe(select('cart'));
    this.total$ = store.pipe(select('total'));
  }

  ngOnInit(): void {
    this.loadCountries();

    let cartData: any = localStorage.getItem('cart')

    const sum = JSON.parse(cartData).reduce((accumulator: any, object: any) => {
      return accumulator + Number(object.total);
    }, 0);

    this.store.dispatch(cart({ data: { cart: JSON.parse(cartData) } }));
    this.store.dispatch(total({ data: { total: sum } }));
  }

  validatePhoneNumber() {
    console.log('afsdjhgasd')
    console.log(this.form.get('phoneNumber')?.value)
    const phoneNumber = this.form.get('phoneNumber')?.value;
    if (phoneNumber) {
      const parsedNumber = libphonenumber.parsePhoneNumberFromString(phoneNumber);
      this.isValidNumber = parsedNumber ? parsedNumber.isValid() : false;
    } else {
      this.isValidNumber = null;
    }
  }

  loadCountries() {
    this.countries = this.locationService.getCountries();
  }

  onCountryChange() {
    this.states = this.locationService.getStates(this.selectedCountry);
    this.selectedState = '';
    this.selectedCity = '';
  }

  onStateChange() {
    this.selectedCity = '';
  }

  selectPayment(type: string) {
    console.log(type)
    this.paymentType = type;
  }

}
