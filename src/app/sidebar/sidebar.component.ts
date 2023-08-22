import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { type } from 'jquery';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  naprUserDetail: any;
  detailData: any;
  complaintData: any

  constructor(private apiService: ApiserviceService,
    private cons: ConstantsService,
  ) { }

  ngOnInit(): void {
    this.naprUserDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '');
    this.getDashboardData();
    this.getComplaintCount();
  }

  getDashboardData() {
    this.apiService.getApi(this.cons.api.dashboardApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.detailData = result;
      },
      error: (e: any) => {
        /// this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  getComplaintCount() {
    this.apiService.getApi(this.cons.api.getComplaintApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.complaintData = result;
      },
      error: (e: any) => {
        /// this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

}
