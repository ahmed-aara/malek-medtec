import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  option: any = true;

  pagesArr: any = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Products', link: '/product' },
    { name: 'Contact', link: '/contact' },
  ]

  categoryArr: any = [
    {
      title: 'Ortopedic', category: [
        'accessories', 'ankle', 'arm', 'calf', 'corsets', 'elbow', 'finger',
        'foot', 'hand', 'hip', 'knee', 'neck', 'shoulder'
      ]
    },
    {
      title: 'Surgery', category: [
        'Surgical products'
      ]
    },
    {
      title: 'Beauty', category: [
        'beauty'
      ]
    },
    {
      title: 'Devices', category: [
        'Physical therapy devices',
        'Slimming devices'
      ]
    }
  ]

  //Variable
  genertare_id_element: any = makeid(12)

  constructor(
    private router: Router) { }

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

}
