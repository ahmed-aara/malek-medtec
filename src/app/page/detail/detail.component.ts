import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment.prod';

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

  //Array
  productArr: any = []

  //Data
  productData: any = {
    name: null,
    img: null,
    specification: null
  }

  loaded_: any = false

  constructor(private product: ProductService, private service: ServiceService, private activatedRoute: ActivatedRoute) { }

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
          specification: data.specification
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

}
