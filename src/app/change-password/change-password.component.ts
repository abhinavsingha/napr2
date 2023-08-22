import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userDetail: any;
  chngPassForm: FormGroup;


  constructor(
    private authService: AuthenticationService,
    private apiService: ApiserviceService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private common: CommonService) {
    this.chngPassForm = this.formBuilder.group({
      currPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confrmPass: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '{}');

    console.log(this.userDetail['response'].userName + " ====");

  }

  submit() {

    if (this.chngPassForm.value.newPassword !== this.chngPassForm.value.confrmPass) {
      this.common.presentAlert('Error', "Password and Confirm Password should be same.", 'error');
    }
    else {
      var chngPassJson = {
        "userName": this.userDetail['response'].userName,
        "oldPassword": this.chngPassForm.value.currPassword,
        "newPassword": this.chngPassForm.value.newPassword,
      };
      ///console.log(JSON.stringify(chngPassJson));
      this.SpinnerService.show();
      this.apiService.postApi(this.cons.api.changePasswordApiUrl, chngPassJson).subscribe({
        next: (v: object) => {
          console.log(JSON.stringify(chngPassJson) + "JSON.stringify(v)............" + JSON.stringify(v));
          let result: { [key: string]: any } = v;
          this.SpinnerService.hide();
          //  console.log(JSON.stringify(result));
          this.common.presentAlert('Success', result['response'].msg, 'success');
         /// this.chngPassForm.reset();
          this.authService.logoutUser();

        },
        error: (e) => {
          this.common.presentAlert('Error', e['error'].response.message, 'error');
        },
        complete: () => console.info('complete')
      });
    }
  }

  reset() {
    this.chngPassForm.reset();
  }

}
