import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiCall/apiservice.service';
import { ConstantsService } from '../../services/constant/constants.service';
import { CommonService } from '../../services/common/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { event } from 'jquery';
import { ExportExcelService } from '../../services/excel/export-excel.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {


  selectedSection = 'none';
  reportDataShow = false;
  reportForm: FormGroup;
  docList: any

  constructor(
    private apiService: ApiserviceService,
    public excelServices: ExportExcelService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private common: CommonService
  ) {
    this.reportForm = this.formBuilder.group({
      docName: ['', Validators.required],
      status: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.getDocList();
  }


  getreportData() {
    this.reportDataShow = true;
    // console.log(JSON.stringify(this.reportForm.value));
    var getReportJson;
    if (this.reportForm.value.status == 'all') {
      getReportJson = {
        "doctorId": '',
        "fromDate": '',
        "toDate": '',
        "status": this.reportForm.value.status,
      }
    }
    else {
      if (this.reportForm.value.fromDate && this.reportForm.value.toDate && this.reportForm.value.fromDate > this.reportForm.value.toDate) {
        this.common.presentAlert('Error', 'To date must be greater than or equal to from date.', 'error');
        return;
      }
      else {
        getReportJson = {
          "doctorId": this.reportForm.value.docName,
          "fromDate": this.reportForm.value.fromDate,
          "toDate": this.reportForm.value.toDate,
          "status": this.reportForm.value.status,
        }
      }
    }
    this.apiService.postApi(this.cons.api.getRportApiUrl, getReportJson).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        let reportdata = result['response'];
        ///console.log(JSON.stringify(reportdata));
        if (reportdata.length > 0) {
          this.excelServices.exportAsExcelFile(reportdata, 'NAPR-Report');
          this.common.presentAlert('Success', "Report downloaded successfully.", 'success');
          this.reportForm.reset();
        }
        else {
          this.common.presentAlert('Error', 'No data found', 'error');
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });



  }

  resetForm() {
    this.reportForm.reset();
  }


  getDocList() {
    var docJson = { "latitude": "99.00", "longitude": "99.89" }
    this.apiService.getPostWithToken(this.cons.api.getDoctorListApiUrl, docJson).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        //  console.log(JSON.stringify(result) + "=====");
        this.docList = result['response'];
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  getReportOption($event: any) {
    if ($event.target.value == "Date") {
      this.selectedSection = 'Date';
      this.reportForm = this.formBuilder.group({
        docName: [this.reportForm.value.docName,],
        status: [this.reportForm.value.status, Validators.required],
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required],
      });
    }
    else {
      this.selectedSection = $event.target.value;
      this.reportForm = this.formBuilder.group({
        docName: [this.reportForm.value.docName,],
        status: [this.reportForm.value.status, Validators.required]
      });
    }
  }




}
