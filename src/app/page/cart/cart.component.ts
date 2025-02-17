import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { cart, total } from 'src/app/redux/data.actions';
import { Store, select } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  //Redux
  cartArr$: Observable<any>;
  total$: Observable<any>;

  //Variable
  img_url: any = environment.api_url

  constructor(
    private store: Store<{ cart: any, total: any }>,
    private router: Router,
  ) {
    this.cartArr$ = store.pipe(select('cart'));
    this.total$ = store.pipe(select('total'));
  }

  ngOnInit(): void {

    let cartData: any = localStorage.getItem('cart')

    const sum = JSON.parse(cartData).reduce((accumulator: any, object: any) => {
      return accumulator + Number(object.total);
    }, 0);

    this.store.dispatch(cart({ data: { cart: JSON.parse(cartData) } }));
    this.store.dispatch(total({ data: { total: sum } }));
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


}
