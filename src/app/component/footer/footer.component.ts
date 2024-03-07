import { Component, OnInit } from '@angular/core';

declare const getDate: any

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  //Array
  pagesArr: any = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Product', link: '/product' },
    { name: 'Contact', link: '/contact' },
  ]

  contactArr: any = [
    {
      type: "phone_white",
      value: "+96550409894"
    },
    {
      type: "time_white",
      value: "Mon-Sat: 08:00AM - 05:00PM"
    },
    {
      type: "location_white",
      value: "Kuwait - Kuwait - Kuwait"
    },
    {
      type: "email_white",
      value: "info@malekmedtec.com"
    }
  ]

  social_links: any = [
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://www.linkedin.com",
    "https://wa.me/+96550409894"
  ]

  //Variable
  year: any

  constructor() {
  }

  ngOnInit(): void {
    this.year = getDate('yyyy')
  }

}
