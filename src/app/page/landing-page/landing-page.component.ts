import { Component, OnInit } from '@angular/core';

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

  ortopedicArr: any = [
    { category: 'ortopedic', title: 'accessories', imgs: [] },
    { category: 'ortopedic', title: 'ankle', imgs: [] },
    { category: 'ortopedic', title: 'arm', imgs: [] },
    { category: 'ortopedic', title: 'calf', imgs: [] },
    { category: 'ortopedic', title: 'corsets', imgs: [] },
    { category: 'ortopedic', title: 'elbow', imgs: [] },
    { category: 'ortopedic', title: 'finger', imgs: [] },
    { category: 'ortopedic', title: 'foot', imgs: [] },
    { category: 'ortopedic', title: 'hand', imgs: [] },
    { category: 'ortopedic', title: 'hip', imgs: [] },
    { category: 'ortopedic', title: 'knee', imgs: [] },
    { category: 'ortopedic', title: 'neck', imgs: [] },
    { category: 'ortopedic', title: 'shoulder', imgs: [] }
  ]

  surgeryArr: any = [
    { category: 'surgery', title: 'surgical-products', imgs: [] }
  ]

  beautyArr: any = [
    { category: 'beauty', title: 'beauty', imgs: [] }
  ]

  devicesArr: any = [
    { category: 'devices', title: 'slimming-devices', imgs: [] },
    { category: 'devices', title: 'physical-therapy-devices', imgs: [] }
  ]

  productArr: any = []

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500 ? true : false
    this.initProduct()
    setTimeout(() => {
      this.loading_ = false
    }, 2000);
  }

  initProduct() {

    //ortopedic
    for (let x = 1; x <= 35; x++) this.ortopedicArr[0].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 35; x++) this.ortopedicArr[1].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 11; x++) this.ortopedicArr[2].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 20; x++) this.ortopedicArr[3].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 53; x++) this.ortopedicArr[4].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 18; x++) this.ortopedicArr[5].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 6; x++) this.ortopedicArr[6].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 23; x++) this.ortopedicArr[7].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 36; x++) this.ortopedicArr[8].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 4; x++) this.ortopedicArr[9].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 36; x++) this.ortopedicArr[10].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 24; x++) this.ortopedicArr[11].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 8; x++) this.ortopedicArr[12].imgs.push({ img: `${x}.jpg` })

    //Surgery
    for (let x = 1; x <= 68; x++) this.surgeryArr[0].imgs.push({ img: `${x}.jpg` })

    //Beauty
    for (let x = 1; x <= 2; x++) this.beautyArr[0].imgs.push({ img: `${x}.jpg` })

    //Desvices
    for (let x = 1; x <= 2; x++) this.devicesArr[0].imgs.push({ img: `${x}.jpg` })
    for (let x = 1; x <= 4; x++) this.devicesArr[1].imgs.push({ img: `${x}.jpg` })

    let arr: any = []

    arr = [...this.ortopedicArr, ...this.surgeryArr, ...this.beautyArr, ...this.devicesArr]

    let product = []

    for (let x = 1; x <= 50; x++) {
      product.push(arr[Math.floor(Math.random() * arr.length)])
    }

    let ortopedicProduct = []

    for (let item of product) {
      ortopedicProduct.push({ category: item.category, title: item.title, img: item.imgs[Math.floor(Math.random() * item.imgs.length)].img })
    }

    // this.productArr = ortopedicProduct

    this.initFilter()
  }

  initFilter() {

    let product_num = 20

    //ortopedic
    let ortopedic_product = []

    for (let x of this.ortopedicArr) {
      for (let xx of x.imgs) {
        ortopedic_product.push({ category: x.category, title: x.title, img: xx.img })
      }
    }

    let random_ortopedic_product = ortopedic_product.sort(() => Math.random() - 0.5)
    let final_ortopedic_product = random_ortopedic_product.slice(0, product_num)

    //surgery
    let surgery_product = []

    for (let x of this.surgeryArr) {
      for (let xx of x.imgs) {
        surgery_product.push({ category: x.category, title: x.title, img: xx.img })
      }
    }

    let random_surgery_product = surgery_product.sort(() => Math.random() - 0.5)
    let final_surgery_product = random_surgery_product.slice(0, product_num)

    //beauty
    let beauty_product = []

    for (let x of this.beautyArr) {
      for (let xx of x.imgs) {
        beauty_product.push({ category: x.category, title: x.title, img: xx.img })
      }
    }

    let random_beauty_product = beauty_product.sort(() => Math.random() - 0.5)
    let final_beauty_product = random_beauty_product.slice(0, product_num)

    //devices
    let device_product = []

    for (let x of this.devicesArr) {
      for (let xx of x.imgs) {
        device_product.push({ category: x.category, title: x.title, img: xx.img })
      }
    }

    let random_device_product = device_product.sort(() => Math.random() - 0.5)
    let final_device_product = random_device_product.slice(0, product_num)

    this.productArr = [...final_ortopedic_product, ...final_surgery_product, ...final_beauty_product, ...final_device_product]

  }


  one(category: any, title: any, img: any) {

    this.productData = {
      title: null,
      img: '',
      link: ''
    }

    setTimeout(() => {
      this.optionModal('modal-detail_home_', true)
    }, 1);

    let message = `I want to know more details about this%0a${window.location.href}/${img.split('.')[0]}`

    this.productData = {
      title: category,
      img: `assets/img/${category}/${title}/${img.split('.')[0]}.jpg`,
      link: `https://api.whatsapp.com/send/?phone=+96550409894&text=${message}&type=phone_number&app_absent=0&type_of_request=ProductDetail`
    }

  }

  sendToKnowMore() {
    let message = "I want to know more"
    let Link = `https://api.whatsapp.com/send/?phone=+96550409894&text=${message}&type=phone_number&app_absent=0&type_of_request=moreDetails`
    window.open(Link, '_blank');
  }

  optionModal(name: any, open: any) {
    open ? UIkit.modal(`#${name}${this.genertare_id_element}`).show() :
      UIkit.modal(`#${name}${this.genertare_id_element}`).hide()
  }

}
