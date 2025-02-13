import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ServiceService } from 'src/app/services/service.service';
import { Observable } from 'rxjs';
import { cart, cart_count, total } from 'src/app/redux/data.actions';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  //Redux
  cartArr$: Observable<any>;
  total$: Observable<any>;
  cart_count$: Observable<any>;

  //Array
  pagesArr: any = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Products', link: '/shop' },
    { name: 'Contact', link: '/contact' },
  ]

  categoryArr: any = []

  //Variable
  genertare_id_element: any = makeid(12)
  option: any = true;
  img_url: any = environment.api_url

  constructor(
    private store: Store<{ cart: any, total: any, cart_count: any }>,
    private router: Router,
    private product: ProductService,
  ) {
    this.cartArr$ = store.pipe(select('cart'));
    this.total$ = store.pipe(select('total'));
    this.cart_count$ = store.pipe(select('cart_count'));
  }

  ngOnInit(): void {

    let cartData: any = localStorage.getItem('cart')

    const sum = JSON.parse(cartData).reduce((accumulator: any, object: any) => {
      return accumulator + Number(object.total);
    }, 0);

    this.store.dispatch(cart({ data: { cart: JSON.parse(cartData) } }));
    this.store.dispatch(total({ data: { total: sum } }));
    this.store.dispatch(cart_count({ data: { cart_count: JSON.parse(cartData).length } }));

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
        let currentUrlPath = event.url.slice(1).split(urlDelimitators)[0];

        var route: any = []
        for (var i = 0; i <= route.length; i++) {
          if (route[i] != currentUrlPath) {
            this.option = true
          } else {
            this.option = false
            break
          }
        }

      }
    });

    this.getCategory()
  }

  getCategory() {

    this.product.all().subscribe(
      response => {
        for (let [i, value] of response.entries()) {
          this.categoryArr.push(
            {
              title: value.super_category,
              category: response[i].product
            }
          )
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  minus(item: any) {

    let object = item
    let item_id = object._id

    let cartData: any = localStorage.getItem('cart')
    let cartArr = JSON.parse(cartData)

    let index = cartArr.findIndex((x: any) => x._id === item_id);

    let quantity = object.quantity
    let price = object.price

    if (quantity > 1) {

      let new_value = quantity -= 1

      cartArr[index].quantity = new_value
      cartArr[index].total = Number(price) * (new_value)

      this.store.dispatch(cart({ data: { cart: cartArr } }));

      localStorage.setItem('cart', JSON.stringify(cartArr))

      let updateCart: any = localStorage.getItem('cart')

      const sum = JSON.parse(updateCart).reduce((accumulator: any, obj: any) => {
        return accumulator + Number(obj.total);
      }, 0);

      this.store.dispatch(total({ data: { total: sum } }));

    }

  }

  plus(item: any) {
    let object = item
    let item_id = object._id

    let cartData: any = localStorage.getItem('cart')
    let cartArr = JSON.parse(cartData)

    let index = cartArr.findIndex((x: any) => x._id === item_id);

    let quantity = object.quantity
    let price = object.price

    if (quantity < 10) {

      let new_value = quantity += 1

      cartArr[index].quantity = new_value
      cartArr[index].total = Number(price) * (new_value)

      this.store.dispatch(cart({ data: { cart: cartArr } }));

      localStorage.setItem('cart', JSON.stringify(cartArr))

      let updateCart: any = localStorage.getItem('cart')

      const sum = JSON.parse(updateCart).reduce((accumulator: any, obj: any) => {
        return accumulator + Number(obj.total);
      }, 0);

      this.store.dispatch(total({ data: { total: sum } }));

    }

  }

  deleteCart(index: any) {
    let cartData: any = localStorage.getItem('cart')
    let data = JSON.parse(cartData)
    data.splice(index, 1)

    const sum = data.reduce((accumulator: any, object: any) => {
      return accumulator + Number(object.total);
    }, 0);

    this.store.dispatch(cart({ data: { cart: data } }));
    this.store.dispatch(total({ data: { total: sum } }));
    localStorage.setItem('cart', JSON.stringify(data))
  }

  callUs() {
    let message = `I want to communicate with you`
    let Link = `https://api.whatsapp.com/send/?phone=+96550409894&text=${message}&type=phone_number&app_absent=0&type_of_request=ContactUs`
    window.open(Link, '_blank');
  }

  closeOffcanvas(name: any) {
    UIkit.offcanvas(`#${name}`).hide();
  }

  closeDropdown() {
    UIkit.dropdown(`#drop_down_${this.genertare_id_element}`).hide(0);
  }

  extractArray(array: any) {
    let arr = []
    for (let x in array) {
      arr.push(x)
    }
    return arr
  }

  optionOffcanvas(name: any, open: any) {
    open ?
      UIkit.offcanvas(`#${name}`).show() :
      UIkit.offcanvas(`#${name}`).hide()
  }

}
