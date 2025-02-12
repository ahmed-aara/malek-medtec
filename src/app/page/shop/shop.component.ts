import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment.prod';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  // Data
  productData = {
    title: null,
    img: '',
    link: ''
  }

  //Array
  allProductArr: any = []
  categoryArr: any = []
  productArr: any = []

  //Variable
  genertare_id_element: any = makeid(12)
  isMobile: any = false
  category: any
  type: any
  img_url: any = environment.api_url

  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500 ? true : false
    this.category = this.route.snapshot.paramMap.get('category');
    this.type = this.route.snapshot.paramMap.get('type');

    this.getCategory()

    if (this.category !== null) {
      this.getProduct(this.type, false)
    } else {
      this.getProduct(null, true)
    }
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

  getProduct(category: any, isRandom: any) {

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

        if (isRandom) {
          const shuffle = (array: string[]) => {
            return array.map((a) => ({ sort: Math.random(), value: a }))
              .sort((a, b) => a.sort - b.sort)
              .map((a) => a.value);
          };

          arr = shuffle(arr);
        }

        let product = []
        product = arr.filter((i: any) => {
          return i.category === category
        })

        this.productArr = isRandom ? arr : product

      },
      err => {
        console.log(err)
      }
    )
  }

  optionModal(name: any, open: any) {
    open ? UIkit.modal(`#${name}${this.genertare_id_element}`).show() :
      UIkit.modal(`#${name}${this.genertare_id_element}`).hide()
  }

  extractArray(array: any) {
    let arr = []
    for (let x in array) {
      arr.push(x)
    }
    return arr
  }

}
