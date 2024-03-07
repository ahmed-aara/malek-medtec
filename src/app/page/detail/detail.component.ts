import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

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

  //Array
  productArr: any = []

  //Data
  productData: any = {
    name: null,
    img: null,
    specification: null
  }

  loaded_: any = false

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.product_id = params['id']
    this.detail(params['id'], false)
    this.getProduct()
    let message = `I want to communicate with you`
    this.contactLink = `https://api.whatsapp.com/send/?phone=${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ContactUs`
  }

  detail(id: any, scroll: any) {
    this.service.getProduct().subscribe(
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
          specification: data.specification
        }

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

  getProduct() {
    this.service.getProduct().subscribe(
      response => {

        let arr = []
        let product_num = 10

        for (let [i, value] of response.entries()) {
          for (let x in response[i].product) {
            for (let y of response[i].product[x]) {
              arr.push(y)
            }
          }
        }

        const shuffle = (array: string[]) => {
          return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        };

        arr = shuffle(arr);

        this.productArr = arr.slice(0, product_num)

      },
      err => {
        console.log(err)
      }
    )
  }

}
