import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment.prod';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from 'src/app/services/category.service';

declare const UIkit: any;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
})
export class ProductComponent {

  //Variable
  loading_: any = false
  img_url: any = environment.api_url
  product_id: any
  update_setting: any = false

  //Array
  productArr: any[] = [];
  categoryArr: any = [];

  //Data
  productData: any = {
    img: null,
  }

  //Form
  form = new FormGroup({
    name: new FormControl(''),
  });

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    specification: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
  });

  get f_product() {
    return this.productForm.controls;
  }

  constructor(private product: ProductService, private category: CategoryService,) { }

  ngOnInit(): void {
    this.getCategory()
    this.getProduct()
  }

  getCategory() {
    this.category.get().subscribe(
      response => {

        this.categoryArr = response.data
        console.log(response)
      },
      err => {
        console.log(err)
      }
    )
  }

  getProduct() {
    // this.loading_ = true
    this.product.get().subscribe(
      response => {
        console.log(response)
        this.productArr = response.data
        this.loading_ = false
      },
      err => {
        console.log(err)
      }
    )
  }

  one(id: any, type: any) {
    this.product_id = id

    this.product.one(id).subscribe(
      response => {

        console.log(response)

        this.f_product.name.setValue(response.data.name)
        this.f_product.price.setValue(response.data.price)
        this.f_product.specification.setValue(response.data.specification)
        this.f_product.category_id.setValue(response.data.category_id)

        this.productData.img = response.data.img

        // this.productData = {
        //   img: response.data.img,
        //   name: response.data.name,
        //   price: response.data.price,
        //   specification: response.data.specification
        // }

        if (type === 'update') {
          this.update_setting = true
          this.optionModal('modal-product', true)
        } else if (type === 'detail') {
          this.optionModal('modal-detail', true)
        }

      },
      err => {
        console.log(err)
      }
    )

  }


  update() {
    if (this.productForm.invalid) return
    else {

      let data = {
        img: this.productData.img,
        ...this.productForm.value
      }

      this.product.update(this.product_id, data).subscribe(
        (response: any) => {
          this.getProduct()
          this.optionModal('modal-product', false)
          this.notification(response.message)
          this.defaultData()
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  add() {

  }

  optionModal(name: any, open: any) {
    open ? UIkit.modal(`#${name}`).show() :
      UIkit.modal(`#${name}`).hide()
  }

  notification(message: any) {
    UIkit.notification({
      message: '<div class="full_left_"><h5 class="m-0 pl-2 whiteC_ f_Medium white_space">' + message + '</h5></div>',
      pos: 'bottom-right',
      timeout: 4000
    });
  }

  formProductReset(): void {
    this.productForm.reset();
  }

  defaultData() {
    this.formProductReset()
    this.update_setting = false
    // this.productData = {
    //   img: null,
    //   name: null,
    //   price: null,
    //   description: null
    // }
    // this.bg_ = {
    //   selected_img: null,
    //   found_img: false,
    //   img_: undefined,
    // }
  }

}
