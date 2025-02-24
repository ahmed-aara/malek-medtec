import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as libphonenumber from 'libphonenumber-js';
import { LocationService } from 'src/app/services/location.service';
import { Observable } from 'rxjs';
import { cart, total } from 'src/app/redux/data.actions';
import { environment } from 'src/environments/environment.prod';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
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
  selectedCountry: any = '';
  selectedState: any = '';
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
    private router: Router,
    private route: ActivatedRoute,
    private order: OrderService
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

    this.route.queryParams.subscribe((params: any) => {

      let country_data: any = this.locationService.getCountries().find((item) => {
        return item.name === params.country
      })

      this.selectedCountry = country_data
      if (country_data && country_data.isoCode) {
        this.states = this.locationService.getStates(country_data.isoCode);

        let states_data = this.locationService.getStates(country_data.isoCode).find((item) => {
          return item.name === params.state
        });

        this.selectedState = states_data
      }

      if (params.type_payment) {
        this.paymentType = params.type_payment
      }

      this.form.patchValue({
        firstname: params.first_name,
        lastname: params.last_name,
        address: params.address,
        phoneNumber: params.phone_number,
        email: params.email,
      });
    });
  }

  getUserData() {
    if (this.auth.isLoggedIn()) {
      this.auth.profile().subscribe(
        response => {
          const user = response.user

          this.user_id = user.id
          const nameParts = user.name.trim().split(' ');

          this.form.patchValue({
            firstname: user.name ? nameParts[0] : '',
            lastname: user.name ? nameParts.slice(1).join(' ') : '',
            phoneNumber: user.phone ? user.phone : '',
            email: user.email,
          });

        },
        err => {
          console.log(err)
        }
      )
    }
  }

  validatePhoneNumber() {
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
    this.states = this.locationService.getStates(this.selectedCountry.isoCode);
    this.selectedState = '';
  }

  selectPayment(type: string) {
    this.paymentType = type;
  }

  checkout() {

    let country_data = this.locationService.getCountries().find((item) => {
      return item.isoCode === this.selectedCountry.isoCode
    })

    let states_data = this.locationService.getStates(this.selectedCountry.isoCode).find((item) => {
      return item.isoCode === this.selectedState.isoCode
    });

    if (this.user_id) {
      console.log('pay')

      let cart_arr: any = []

      this.cartArr$.subscribe(cartData => {
        for (let x of cartData) {
          cart_arr.push({
            id: x._id,
            quantity: x.quantity
          })
        }
      });

      let data = {
        user_id: this.user_id,
        products_id: cart_arr,
        customer_date: {
          name: `${this.form.value.firstname} ${this.form.value.lastname}`,
          phone: this.form.value.phoneNumber
        },
        customer_location: {
          address: this.form.value.address,
          country: country_data && country_data?.name,
          state: states_data && states_data?.name
        },
        type_payment: this.paymentType
      }

     
      

      console.log(data)
    } else {

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
