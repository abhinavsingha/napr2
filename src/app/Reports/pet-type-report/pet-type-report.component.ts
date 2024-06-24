import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiserviceService } from 'src/app/services/apiCall/apiservice.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ConstantsService } from 'src/app/services/constant/constants.service';
import { ExportExcelService } from 'src/app/services/excel/export-excel.service';

@Component({
  selector: 'app-pet-type-report',
  templateUrl: './pet-type-report.component.html',
  styleUrls: ['./pet-type-report.component.scss']
})
export class PetTypeReportComponent implements OnInit {

  PetReportForm: any;
  society: any[]=[];



  constructor(
    private formBuilder: FormBuilder,
    private common: CommonService,
    private apiService: ApiserviceService,
    public excelServices: ExportExcelService,
    private SpinnerService: NgxSpinnerService,
    private cons: ConstantsService,
  ) {
    this.PetReportForm = this.formBuilder.group({
      petType: ['', Validators.required],
      gender: ['', Validators.required],
      society:['']
    });
  }

  ngOnInit(): void {
    this.getAllSociety();
  }

  resetForm() {
    this.PetReportForm.reset();
  }

  getPetreport() {
    debugger;

    console.log(JSON.stringify(this.PetReportForm.value));
    var getReportJson = {
      "petType": this.PetReportForm.value.petType,
      "gender": this.PetReportForm.value.gender,
      "societyId":this.PetReportForm.value.society,
    }
    this.SpinnerService.show();
    this.apiService.postApi(this.cons.api.getPetReportApiUrl, getReportJson).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        let perReportdata = result['response'];
        this.SpinnerService.hide();
        var reportName;
        if (this.PetReportForm.value.petType == '01') {
          reportName = 'Dog';
        }
        else if (this.PetReportForm.value.petType == '02') {
          reportName = 'Cat';
        }
        if (perReportdata.length > 0) {
          this.excelServices.exportAsExcelFile(perReportdata, 'NAPR-' + reportName + '-Report');
          this.common.presentAlert('Success', "Report downloaded successfully.", 'success');
          this.PetReportForm.reset();
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
  getAllSociety() {
    this.society=[];
    this.SpinnerService.show();
    this.apiService.getApi(this.cons.api.getAllSociety).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        let societyData = result['response'];
        this.SpinnerService.hide();
        this.society=societyData;
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

}
