import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ExportExcelService } from '../services/excel/export-excel.service';
declare var $: any


@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {

  downloadList: any;
  userList: any;
  showListItem: any = 10;
  p: number = 1;
  userPetList: any;
  selecteduser: any;
  searchText: any;


  constructor(private apiService: ApiserviceService,
    public excelServices: ExportExcelService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    public common: CommonService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }


  getUserDetail(data: any) {
    this.SpinnerService.show();
    this.selecteduser = data;
    var url = this.cons.api.getUserDetailsApiUrl + data.customerId;
    this.apiService.getApi(url).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.userPetList = result['response'];
        for (let i = 0; i < this.userPetList.length; i++) {
          this.userPetList[i].id = i + 1;
        }
        /// console.log(JSON.stringify(this.userPetList)+ "====");
        ///$("#modal-lg").modal('show');
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  getExcel() {
    this.SpinnerService.show();
    this.apiService.getApi(this.cons.api.getAllUserListApiUrl).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.downloadList = result['response'];
        this.excelServices.exportAsExcelFile(this.downloadList, 'All-User-List');
        this.common.presentAlert('Success', "Report downloaded successfully.", 'success');
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


  getUserList() {
    this.SpinnerService.show();
    this.apiService.getApi(this.cons.api.getAllUserListApiUrl).subscribe({
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

}
