import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare const UIkit: any;

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.scss']
})
export class LoginDashboardComponent implements OnInit {

  //Variable
  loading_: any = false

  //Form
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    isAdmin: new FormControl('1'),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.auth.login(this.form.value).subscribe(
      response => {
        localStorage.setItem('admin', 'true')
        this.router.navigateByUrl('/admin/product')
      },
      err => {
        console.log(err)
      }
    )

  }

  formReset(): void {
    this.form.reset();
  }

  notification(message: any) {
    UIkit.notification({
      message: '<div class="full_left_"><h5 class="m-0 pl-2 whiteC_ f_Medium white_space line_height mt-1" style="--height: 1.5rem">' + message + '</h5></div>',
      pos: 'bottom-right',
      timeout: 4000
    });
  }

}
