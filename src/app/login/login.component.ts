import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


interface ApiResponse {
  setToken: string;
  // Other properties in the response if any
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;

  loginForm: FormGroup;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnInit(): void {
    $(function () {

      $('#eye').click(function () {
        if ($(this).hasClass('fa-eye-slash')) {

          $(this).removeClass('fa-eye-slash');

          $(this).addClass('fa-eye');

          $('#password').attr('type', 'text');

        } else {

          $(this).removeClass('fa-eye');

          $(this).addClass('fa-eye-slash');

          $('#password').attr('type', 'password');
        }
      });
    });
  }


  login() {
    if(this.loginForm.get('userId')?.value=='admin'&&this.loginForm.get('password')?.value=='admin'){
      this.router.navigate(['/dashboard']);
    };

  }


}
