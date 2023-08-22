import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiCall/apiservice.service';
import { ConstantsService } from '../../services/constant/constants.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-complaint-history',
  templateUrl: './complaint-history.component.html',
  styleUrls: ['./complaint-history.component.scss']
})
export class ComplaintHistoryComponent implements OnInit {
 
  p: number = 1;
  complaintHisList: any;
  showListItem: any = 10;
  historyList: any = [];
  searchText:any;
  
  constructor(
    private SpinnerService: NgxSpinnerService,
    private apiService: ApiserviceService,
    private cons: ConstantsService) { }

  ngOnInit(): void {
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
        this.complaintHisList = result['response'];
        for (let i = 0; i < this.complaintHisList.length; i++) {
          if (this.complaintHisList[i].status === 'COM') {
            this.historyList.push({
              "complaintId": this.complaintHisList[i].complaintId,
              "createdOn": this.complaintHisList[i].createdOn,
              "ownerName": this.complaintHisList[i].ownerName,
              "petName": this.complaintHisList[i].petName,
              "petType": this.complaintHisList[i].petType,
              "breed": this.complaintHisList[i].breed,
              "reason": this.complaintHisList[i].reason,
              "nameOfComplainer": this.complaintHisList[i].nameOfComplainer,
              "detailsOfComplainer": this.complaintHisList[i].detailsOfComplainer,
              "fineAmount": this.complaintHisList[i].fineAmount,
              "petImages1": this.complaintHisList[i].petImages1,
              "petImages2": this.complaintHisList[i].petImages2,
              "petImages3": this.complaintHisList[i].petImages3,
              "petImages4": this.complaintHisList[i].petImages4,
              "status": this.complaintHisList[i].status,
              "viewComplainCount": this.complaintHisList[i].viewComplainCount,
              "complainHistoryCount": this.complaintHisList[i].complainHistoryCount,
              "address": this.complaintHisList[i].address,
            });
          }
          for (let i = 0; i < this.historyList.length; i++) {
            this.historyList[i].id = i + 1;
          }
        }
      },
      error: (e: any) => {
        /// this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }


}
