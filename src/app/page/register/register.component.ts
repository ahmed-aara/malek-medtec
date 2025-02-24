import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  // Variables
  error_box = {
    msg: '',
    status: false
  }

  fullQuery: any;

  //Form
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

  constructor(private auth: AuthService, private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.fullQuery = params

      this.form.patchValue({
        firstname: params.first_name,
        lastname: params.last_name,
      });
    });
  }

  submit() {
    console.log(this.form.value);

    this.auth.register(this.form.value).subscribe(
      response => {
        // localStorage.setItem('admin', 'true')
        // this.router.navigateByUrl('/admin/product')

        if (this.fullQuery.first_name) {
          this.router.navigate(['/checkout'], {
            queryParams: this.fullQuery
          });
        }

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
