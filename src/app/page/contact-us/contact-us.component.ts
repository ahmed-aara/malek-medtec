import { Component } from '@angular/core';
import { MailService } from 'src/app/services/mail.service';
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
      value: "Sat-Thur: 08:00AM - 05:00PM"
    },
    {
      type: "location",
      value: "Kuwait - Hawally"
    },
    {
      type: "email",
      value: "info@malekmedtec.com"
    }
  ]

  //Variable
  loading: any = false

  constructor(private service: ServiceService, private mail: MailService) { }

  sendMessage() {

    if (this.messageData.name === '' || this.messageData.name === null ||
      this.messageData.phone === '' || this.messageData.phone === null ||
      this.messageData.message === '' || this.messageData.message === null
    ) {
      this.notification('Please enter all required data')
    } else {
      this.loading = true
      this.mail.sendMail(this.messageData).subscribe(
        response => {
          if (response.success) {
            this.notification(response.message)
            this.loading = false
            this.messageData = {
              name: null,
              email: null,
              phone: null,
              message: null,
            }

          }
        },
        err => {
          console.log(err)
          this.loading = false
        }
      )
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
