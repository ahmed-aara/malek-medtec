import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as libphonenumber from 'libphonenumber-js';
import { LocationService } from 'src/app/services/location.service';
import { Observable } from 'rxjs';
import { cart, total } from 'src/app/redux/data.actions';
import { environment } from 'src/environments/environment.prod';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';

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
  user_id: string = '';

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
    private locationService: LocationService,
    private auth: AuthService,
    private router: Router
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
    this.getUserData()
  }

  getUserData() {
    if (this.auth.isLoggedIn()) {
      this.auth.profile().subscribe(
        response => {
          this.user_id = response.user.id
        },
        err => {
          console.log(err)
        }
      )
    }
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
    this.paymentType = type;
  }

  checkout() {
    console.log('ahmed')
    if (this.user_id) {
      console.log('pay')
    } else {

      let country_data = this.locationService.getCountries().find((item) => {
        return item.isoCode === this.selectedCountry
      })

      let states_data = this.locationService.getStates(this.selectedCountry).find((item) => {
        return item.isoCode === this.selectedState
      });

      this.router.navigate(['/login'], {
        queryParams: {
          first_name: this.form.value.firstname,
          last_name: this.form.value.lastname,
          email: this.form.value.email,
          address: this.form.value.address,
          country: country_data && country_data?.name,
          state: states_data && states_data?.name,
          phone_number: this.form.value.phoneNumber,
          type_payment: this.paymentType,
        }
      });

    }
  }

}
