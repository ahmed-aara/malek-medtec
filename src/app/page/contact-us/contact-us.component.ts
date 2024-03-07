import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

declare const UIkit: any

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {

  //Data
  messageData: any = {
    name: null,
    email: null,
    phone: null,
    message: null,
  }

  //Array
  contactArr: any = [
    {
      type: "phone",
      value: "+96550409894"
    },
    {
      type: "time",
      value: "Mon-Sat: 08:00AM - 05:00PM"
    },
    {
      type: "location",
      value: "Business Bay - Saudi - Saudi"
    },
    {
      type: "email",
      value: "info@malekmedtec.com"
    }
  ]

  constructor(private service: ServiceService) { }


  sendMessage() {
    if (this.messageData.name || this.messageData.phone) {
      let message = `I want to communicate with you%0aName: ${this.messageData.name}%0aPhone: ${this.messageData.phone}%0aEmail: ${this.messageData.email}%0aMessage: ${this.messageData.message}`
      let Link = `https://api.whatsapp.com/send/?phone=${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ContactUs`
      window.open(Link, '_blank');
    } else {
      this.notification('you should Enter Your Name and Your Phone')
    }
  }

  notification(message: any) {
    UIkit.notification({
      message: '<div class="full_left_"><h5 class="m-0 whiteC_ f_Medium white_space">' + message + '</h5></div>',
      pos: 'bottom-right',
      timeout: 4000
    });
  }

}
