import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiCall/apiservice.service';
import { ConstantsService } from '../../services/constant/constants.service';
import { CommonService } from '../../services/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.scss']
})

export class ViewComplaintComponent implements OnInit {
  p: number = 1;
  complaintList: any;
  showListItem: any = 10;
  imageUrl: any = this.cons.imageUrl;
  searchText:any;


  constructor(private apiService: ApiserviceService,
    private SpinnerService: NgxSpinnerService,
    private cons: ConstantsService,public common: CommonService) {

  }

  ngOnInit(): void {
    $.getScript('assets/main.js');
    this.getComplaintList();
  }



  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }


  getComplaintList() {
    this.SpinnerService.show();
    this.apiService.getApi(this.cons.api.getComplaintApiUrl).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.complaintList = result['response'];
        for (let i = 0; i < this.complaintList.length; i++) {
          const index = this.complaintList.findIndex((a: { status: any; }) => a.status === 'COM');
          if (index != '-1') {
            this.complaintList.splice(index, 1);
          }
          this.complaintList[i].id = i + 1;
        }
      },
      error: (e: any) => {
        /// this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

}
