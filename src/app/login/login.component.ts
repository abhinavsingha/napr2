import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
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
  formGroup!: FormGroup;
  error: any;

  isFormValid = false;
  areCredentialsInvalid = false;
  loginForm: FormGroup;


  constructor(private authenticationService: AuthenticationService,
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
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

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
    this.authenticationService.authenticate(this.loginForm.value);
  }

  // login() {
  //   this.SpinnerService.show();
  //   var loginJson = { "USERTYPE": this.userType, "USERID": this.loginForm.value.userid, "PASSWORD": this.loginForm.value.password };
  //   this.apiService.apiPostService(this.cons.api.loginApiUrl, loginJson).subscribe(res => {
  //     this.SpinnerService.hide();
  //     let result: { [key: string]: any } = res;

  //     console.log(JSON.stringify(result) + " >>>>>>>>>result");


  //     if (result.P_RESULT == "PASSWORD INCORRECT") {
  //       this.common.presentAlert('', result.P_RESULT, 'error');
  //       this.router.navigate(['']);
  //     }
  //     else if (result.P_RESULT == "Fail") {
  //       this.common.presentAlert('', "Invalid Credentials", 'error');
  //       this.router.navigate(['']);
  //     }
  //     else if (result.P_RESULT == "ROLE NOT ASSIGNED") {
  //       this.common.presentAlert('', result.P_RESULT, 'error');
  //       this.router.navigate(['']);
  //     }
  //     else if (result.msg == "success") {
  //       this.common.presentToast('' + "You have login as a " + result.result[0]['ORG'] + " user", 'success');
  //       localStorage.setItem("loginUserDetail", JSON.stringify(result.result[0]));
  //       console.log("user login>>>>>>>>" + result.result[0]);
  //       this.router.navigate(['home']);
  //     }
  //     else if (result.STATUS == "Failed") {
  //       this.common.presentAlert('', result.result, 'error');
  //     }
  //   }, err => {
  //     // console.log(JSON.stringify(err) + " err");
  //     this.SpinnerService.hide();
  //     this.router.navigate(['']);
  //     this.common.presentToast(err + '\n' + this.cons.message.serverError, 'error');
  //   });
  // }

}
