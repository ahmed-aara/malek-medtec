import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  // Variables
  error_box = {
    msg: '',
    status: false
  }

  fullQuery: any;

  //Form
  form = new FormGroup({
    email: new FormControl('a@email.com', [Validators.required, Validators.email]),
    password: new FormControl('123', Validators.required),
  });

  constructor(private auth: AuthService, private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.fullQuery = params
    });
  }

  submit() {
    console.log(this.form.value);

    this.auth.login(this.form.value).subscribe(
      response => {
        // localStorage.setItem('admin', 'true')
        // this.router.navigateByUrl('/admin/product')

        if (this.fullQuery.first_name) {
          this.router.navigate(['/checkout'], {
            queryParams: this.fullQuery
          });
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
