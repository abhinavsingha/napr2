import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-manage-notification',
  templateUrl: './manage-notification.component.html',
  styleUrls: ['./manage-notification.component.scss']
})
export class ManageNotificationComponent implements OnInit {

  notiList: any;
  showListItem: any = 10;
  p: number = 1;
  addNotiFrom: FormGroup;
  searchText: any;

  constructor(
    private apiService: ApiserviceService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private common: CommonService
  ) {
    this.addNotiFrom = this.formBuilder.group({
      notitext: ['', Validators.required]
    })
  }


  ngOnInit(): void {
    this.getNotificationList();
  }

  reset() {
    this.addNotiFrom.reset();
  }


  addNoti() {
    var notiJson = { "descr": this.addNotiFrom.value.notitext };
    this.SpinnerService.show();
    this.apiService.postApi(this.cons.api.addNotiApiUrl, notiJson).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.SpinnerService.hide();
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.addNotiFrom.reset();
        this.getNotificationList();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }



  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }

  getNotificationList() {
    //sector/getNotification
    this.apiService.getApi(this.cons.api.notiListApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.notiList = result['response'];
        for (let i = 0; i < this.notiList.length; i++) {
          this.notiList[i].id = i + 1;
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }
}
