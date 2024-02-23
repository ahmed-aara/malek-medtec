import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  //Variable
  genertare_id_element: any = makeid(12)
  isMobile: any = false
  category: any
  type: any

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 500 ? true : false
    this.category = this.route.snapshot.paramMap.get('category');
    this.type = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.one(this.category, this.type, id + '.jpg')
    }

    this.initProduct()

    if (this.category !== null) {
      this.filter(this.category, this.type)
    }
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

    let _Product = []

    for (let item of product) {
      _Product.push({ category: item.category, title: item.title, img: item.imgs[Math.floor(Math.random() * item.imgs.length)].img })
    }

    this.category !== null ? this.productArr = [] : this.productArr = _Product
  }

  filter(category: any, type: any) {

    let product = []

    if (category.toLowerCase() === 'ortopedic') {
      product = this.ortopedicArr.find((data: any) => {
        return data.title === type.toLowerCase().replace(new RegExp(' ', 'g'), '-')
      })
    } else if (category.toLowerCase() === 'surgery') {
      product = this.surgeryArr.find((data: any) => {
        return data.title === type.toLowerCase().replace(new RegExp(' ', 'g'), '-')
      })
    } else if (category.toLowerCase() === 'beauty') {
      product = this.beautyArr.find((data: any) => {
        return data.title === type.toLowerCase().replace(new RegExp(' ', 'g'), '-')
      })
    } else if (category.toLowerCase() === 'devices') {
      product = this.devicesArr.find((data: any) => {
        return data.title === type.toLowerCase().replace(new RegExp(' ', 'g'), '-')
      })
    }

    let _Product = []

    for (let [i, value] of product.imgs.entries()) {
      _Product.push({ category: product.category, title: product.title, img: product.imgs[i].img })
    }

    this.productArr = _Product

  }

  one(category: any, title: any, img: any) {

    this.productData = {
      title: null,
      img: '',
      link: ''
    }

    setTimeout(() => {
      this.optionModal('modal-detail_', true)
    }, 1);

    let message = `I want to know more details about this%0a${window.location.href}/${img.split('.')[0]}`

    this.productData = {
      title: category,
      img: `assets/img/${category}/${title}/${img.split('.')[0]}.jpg`,
      link: `https://api.whatsapp.com/send/?phone=+96550409894&text=${message}&type=phone_number&app_absent=0&type_of_request=ProductDetail`
    }

  }

  optionModal(name: any, open: any) {
    open ? UIkit.modal(`#${name}${this.genertare_id_element}`).show() :
      UIkit.modal(`#${name}${this.genertare_id_element}`).hide()
  }

}
