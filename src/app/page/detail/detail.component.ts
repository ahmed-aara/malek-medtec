import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { cart, total } from 'src/app/redux/data.actions';

declare const UIkit: any

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  @ViewChild('product_page')
  product_page: ElementRef | any;

  //variable
  product_id: any
  askProductLink: any
  contactLink: any
  img_url: any = environment.api_url
  quantity: any = 1

  //Array
  productArr: any = []

  //Data
  productData: any = {
    name: null,
    img: null,
    specification: null,
    price: null,
  }

  loaded_: any = false

  constructor(private product: ProductService,
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private store: Store,

  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.product_id = params['id']
    this.detail(params['id'], false)
    let message = `I want to communicate with you`
    this.contactLink = `https://api.whatsapp.com/send/?phone=${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ContactUs`
  }

  detail(id: any, scroll: any) {
    this.product.all().subscribe(
      response => {

        let arr = []

        for (let [i, value] of response.entries()) {
          for (let x in response[i].product) {
            for (let y of response[i].product[x]) {
              arr.push(y)
            }
          }
        }

        let data = arr.find((i: any) => {
          return i.id == id
        })

        this.productData = {
          name: data.name,
          img: data.img,
          specification: data.specification,
          price: data.price,
        }

        this.reltaedProduct(response, data.super_category, data.category)

        let message = `I want to know more details about *(${data.name})*%0a${window.location.href}`
        this.askProductLink = `https://api.whatsapp.com/send/?phone=${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ProductDetail`

        setTimeout(() => {
          this.loaded_ = true
        }, 500);

        if (scroll) {
          this.product_page.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }

      },
      err => {
        console.log(err)
      }
    )
  }

  reltaedProduct(product: any, super_category: any, category: any) {

    let data = product.find((i: any) => {
      return i.super_category === super_category
    }).product[category]

    const shuffle = (array: string[]) => {
      return array.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    };

    data = shuffle(data);

    this.productArr = data.slice(0, 10)
  }

  minus() {
    if (this.quantity > 1) {
      this.quantity -= 1
    }
  }

  plus() {
    if (this.quantity < 10) {
      this.quantity += 1
    }
  }

  addCart(open: any) {
    let cartData: any = localStorage.getItem('cart')
    let cartArr = JSON.parse(cartData)

    let isExist = cartArr.some((e: any) => e._id === this.product_id)

    if (isExist) this.notification('You are already Added in Cart')
    else {

      let i = {
        name: this.productData.name,
        quantity: this.quantity,
        total: Number(this.productData.price) * this.quantity,
        price: Number(this.productData.price),
        img: this.productData.img.split('/')[(this.productData.img.split('/').length) - 1],
        _id: this.product_id,
      }

      cartArr.push(i)
      localStorage.setItem('cart', JSON.stringify(cartArr))
      open ? UIkit.offcanvas(`#offcanvas-cart`).show() : null

      let updatedData: any = localStorage.getItem('cart')

      const sum = JSON.parse(updatedData).reduce((accumulator: any, object: any) => {
        return accumulator + Number(object.total);
      }, 0);

      this.store.dispatch(cart({ data: { cart: JSON.parse(updatedData) } }));
      this.store.dispatch(total({ data: { total: sum } }));
    }
  }

  notification(message: any) {
    UIkit.notification({
      message: '<div class="full_left_"><h5 class="m-0 pl-2 whiteC_ f_Medium white_space line_height mt-1" style="--height: 1.5rem">' + message + '</h5></div>',
      pos: 'bottom-right',
      timeout: 4000
    });
  }

}
