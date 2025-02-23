import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // Variables
  error_box = {
    msg: '',
    status: false
  }

  //Form
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService) { }

  submit() {
    console.log(this.form.value);

    this.auth.register(this.form.value).subscribe(
      response => {
        // localStorage.setItem('admin', 'true')
        // this.router.navigateByUrl('/admin/product')

        this.error_box = {
          msg: '',
          status: false
        }
      },
      err => {
        console.log(err)
        if (err.status == 400) {
          this.error_box = {
            msg: err.error.message,
            status: true
          }
        }
      }
    )
  }

}
