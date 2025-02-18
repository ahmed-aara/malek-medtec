import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //Form
    form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    constructor(private auth: AuthService) {}

    submit() {
      console.log(this.form.value);

      this.auth.login(this.form.value).subscribe(
        response => {
          // localStorage.setItem('admin', 'true')
          // this.router.navigateByUrl('/admin/product')
        },
        err => {
          console.log(err)
        }
      )


    }
}
