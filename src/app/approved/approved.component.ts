import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExportExcelService } from '../services/excel/export-excel.service';


@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.scss']
})
export class ApprovedComponent implements OnInit {

  showListItem: any = 10;
  p: number = 1;
  userList: any;
  naprUserDetail: any;
  downloadList: any;
  searchText: any = '';

  constructor(
    private apiService: ApiserviceService,
    public excelServices: ExportExcelService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    public common: CommonService
  ) { }

  ngOnInit(): void {
    this.naprUserDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '');
    this.getUserList();
  }

  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }


  getUserList() {
    this.SpinnerService.show();
    var url;

    if (this.naprUserDetail['response'].userType == 'AD') {
      url = this.cons.api.getUserListForAdminApiUrl + 'AP';
    }
    else if (this.naprUserDetail['response'].userType == 'SD') {
      url = this.cons.api.getUserListForStaffApiUrl + 'AP';
    }

    this.apiService.getApi(url).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.userList = result['response'];
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].id = i + 1;
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  getExcel() {
    this.SpinnerService.show();
    var url;

    if (this.naprUserDetail['response'].userType == 'AD') {
      url = this.cons.api.getUserListForAdminApiUrl + 'AP';
    }
    else if (this.naprUserDetail['response'].userType == 'SD') {
      url = this.cons.api.getUserListForStaffApiUrl + 'AP';
    }

    this.apiService.getApi(url).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.downloadList = result['response'];
        this.excelServices.exportAsExcelFile(this.downloadList, 'Approved_List');
        this.common.presentAlert('Success', "Report downloaded successfully.", 'success');
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });

  }

}
