import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

declare const UIkit: any, makeid: any

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // Data
  productData = {
    title: null,
    img: '',
    link: ''
  }

  //Variable
  genertare_id_element: any = makeid(12)
  isMobile: any = false
  loading_: any = true

  //Array
  aboutArr: any = [
    {
      img: 'assets/img/medical-aesthetics-machines.jpg',
      title: 'Medical Aesthetics Machines',
      description: 'Elevate your practice with our advanced medical aesthetics machines. From laser systems to body contouring devices, our cutting-edge technology delivers superior results for hair removal, skin rejuvenation, and more.'
    },
    {
      img: 'assets/img/skincare-products.jpg',
      title: 'Skincare Products',
      description: 'Transform your clients\' skin with our premium skincare products. Our formulations target aging, acne, and hyperpigmentation, providing visible results and improved skin health.'
    },
    {
      img: 'assets/img/cosmetics-and-Injectables.jpg',
      title: 'Cosmetics and Injectables',
      description: 'Enhance your aesthetic treatments with our range of injectables and cosmetics. From dermal fillers to lip enhancements, our products are sourced from trusted manufacturers and ensure natural-looking results.'
    },
  ]

  serviceArr: any = [
    {
      title: 'Continuous Innovation',
      description: `We're dedicated to constant innovation, developing new products and services to meet evolving needs and stay at the forefront of the industry.`
    },
    {
      title: 'Regional Market Expansion',
      description: `Our vision involves expanding into new regional markets, ensuring more people have access to our high-quality solutions tailored to local demands.`
    },
    {
      title: 'Patient-Centric Approach',
      description: `Patient satisfaction is our priority. We focus on exceeding their expectations by providing personalized solutions that enhance their well-being.`
    },
    {
      title: 'Quality and Affordability',
      description: `We're committed to offering top-quality products at competitive prices, making quality healthcare accessible to various healthcare institutions.`
    },
    {
      title: 'Long-Term Partnerships',
      description: `Building enduring relationships with our clients is fundamental. We provide ongoing support and expertise to help them succeed and grow their practices.`
    },
    {
      title: 'Industry Leadership',
      description: `As leaders in the field, we set high standards for excellence, driving innovation and inspiring positive change within the medical aesthetics industry.`
    },
  ]

  productArr: any = []

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500 ? true : false
    setTimeout(() => {
      this.loading_ = false
    }, 200);
    this.getProduct()
  }

  sendToKnowMore() {
    let message = "I want to know more"
    let Link = `https://api.whatsapp.com/send/?phone=${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=moreDetails`
    window.open(Link, '_blank');
  }

  getProduct() {
    this.service.getProduct().subscribe(
      response => {

        let arr = []
        let product_num = 20

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

        //ortopedic
        let ortopedic_product = []
        ortopedic_product = arr.filter((i: any) => {
          return i.super_category === "ortopedic"
        })

        //surgery
        let surgery_product = []
        surgery_product = arr.filter((i: any) => {
          return i.super_category === "plastic-surgery"
        })

        //Bueauty & Cosmetics
        let bueauty_product = []
        bueauty_product = arr.filter((i: any) => {
          return i.super_category === "bueauty-cosmetics"
        })

        //Devices
        let devices_product = []
        devices_product = arr.filter((i: any) => {
          return i.super_category === "devices"
        })

        this.productArr = [
          ...ortopedic_product.slice(0, product_num),
          ...surgery_product.slice(0, product_num),
          ...bueauty_product.slice(0, product_num),
          ...devices_product.slice(0, product_num)]

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

}
