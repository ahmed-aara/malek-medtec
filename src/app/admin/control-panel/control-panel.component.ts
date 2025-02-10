import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const UIkit: any
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {


  staus: any = false

  //Array
  pageArr: any = [
    { title: 'Category', link: 'category' },
    { title: 'Product', link: 'product' },
    { title: 'Setting', link: 'setting' },
    { title: 'Orders', link: 'order' },
    { title: 'Messages', link: 'messages' }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/admin') {
      this.router.navigateByUrl('/admin/product')
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
