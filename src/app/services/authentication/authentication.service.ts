import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from '../constant/constants.service';
import { CommonService } from '../common/common.service';
import { ApiserviceService } from '../apiCall/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: any;

  constructor(
    private router: Router,
    private apiService: ApiserviceService,
    private cons: ConstantsService,
    private common: CommonService
  ) { }

  authenticate(signInData: any) {
    var loginJson = { "userName": signInData.userId, "password": signInData.password };
    // console.log(JSON.stringify(loginJson) + " ________" + this.cons.api.loginApiUrl);
    this.apiService.postApi(this.cons.api.loginApiUrl, loginJson).subscribe({
      next: (v: object) => {
        //console.log("getToeknApi............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        localStorage.setItem("naprUserDetail", JSON.stringify(result));
        localStorage.setItem("userToken", result['response'].setToken);
        this.isAuthenticated = true;
        this.router.navigate(['/dashboard']);
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }


  isUserLoggedIn(): boolean {
    let LoginUser = localStorage.getItem("naprUserDetail");
    if (LoginUser == undefined || LoginUser == '' || LoginUser == null) {
      return false;
    } else {
      return true;
    }
    /// return this.isAuthenticated;
  }

  logoutUser(): void {
    this.isAuthenticated = false;
    localStorage.clear();
    localStorage.removeItem("naprUserDetail");
    localStorage.removeItem("userToken");
    this.router.navigate(['']);
  }

}
