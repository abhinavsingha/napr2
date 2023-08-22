import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExportExcelService } from '../services/excel/export-excel.service';

import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
declare var $: any


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {


  showListItem: any = 10;
  p: number = 1;
  userList: any;
  naprUserDetail: any;
  downloadList: any;
  searchText: any = '';

  previousUrl: any;
  currentUrl: any;

  constructor(private apiService: ApiserviceService,
    private cons: ConstantsService,
    public excelServices: ExportExcelService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private common: CommonService) {
    $("#actionModel").modal('hide');

  }

  ngOnInit(): void {
    // if(){

    // }

    this.naprUserDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '');
    this.getUserList();
  }


  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }

  getExcel() {
    this.SpinnerService.show();
    var url;

    if (this.naprUserDetail['response'].userType == 'AD') {
      url = this.cons.api.getUserListForAdminApiUrl + 'IB';
    }
    else if (this.naprUserDetail['response'].userType == 'SD') {
      url = this.cons.api.getUserListForStaffApiUrl + 'IB';
    }

    this.apiService.getApi(url).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        this.downloadList = result['response'];
        this.excelServices.exportAsExcelFile(this.downloadList, 'Inbox_List');
        this.common.presentAlert('Success', "Report downloaded successfully.", 'success');
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });

  }

  getUserList() {
    this.SpinnerService.show();
    var url;

    if (this.naprUserDetail['response'].userType == 'AD') {
      url = this.cons.api.getUserListForAdminApiUrl + 'IB';
    }
    else if (this.naprUserDetail['response'].userType == 'SD') {
      url = this.cons.api.getUserListForStaffApiUrl + 'IB';
    }
    this.apiService.getApi(url).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.userList = result['response'];
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].id = i + 1;
        }
        this.SpinnerService.hide();
        this.router.events
          .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
          .subscribe((events: RoutesRecognized[]) => {
            this.previousUrl = events[0].urlAfterRedirects;
            this.previousUrl = this.previousUrl.substring(1, 10);
           /// console.log("preurl=====" + this.previousUrl);
            if (this.previousUrl === "view-form") {
              setTimeout(this.reloadPage, 1000);
            }
          });
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  reloadPage() {
    window.location.reload();
  }

}
