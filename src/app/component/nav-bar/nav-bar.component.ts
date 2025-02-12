import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ServiceService } from 'src/app/services/service.service';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

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

  constructor(
    private router: Router,
    private product: ProductService,

  ) { }

  ngOnInit(): void {

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

}
