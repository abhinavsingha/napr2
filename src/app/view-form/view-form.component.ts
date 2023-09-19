import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiCall/apiservice.service';
import { ConstantsService } from '../services/constant/constants.service';
import { CommonService } from '../services/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {

  naprUserDetail: any;
  parentData: any;
  userDetail: any;
  imageUrl: any = this.cons.imageUrl;
  actionForm: FormGroup;
  actionValue: any;
  disableButton: boolean = true;
  private file: any;

  constructor(private apiService: ApiserviceService,
    private cons: ConstantsService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private common: CommonService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,) {
   // $.getScript('assets/main.js');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.parentData = params;
      }
    });

    this.actionForm = this.formBuilder.group({
      reamrksText: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.naprUserDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '');
    $("#modal-lg").modal('hide');
    this.getUserDetail();
  }

  getAction(action: any) {
    this.actionValue = action;
    $("#actionModel").modal('show');
  }

  submit() {
    var actionJson = {
      "userId": this.naprUserDetail['response'].userId,
      "userType": this.naprUserDetail['response'].userType,
      "formId": this.userDetail.formId,
      "remark": this.actionForm.value.reamrksText,
      "button": this.actionValue
    };
    this.SpinnerService.show();
    this.apiService.patchApi(this.cons.api.appRejApiUrl, actionJson).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.router.navigate(['/inbox']);
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });

  }

  getUserDetail() {
    this.SpinnerService.show();
    debugger;
    var url = this.cons.api.petDetailsApiUrl + this.parentData['frmId'];
    this.apiService.getApi(url).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.userDetail = result['response'][0];
        console.log(JSON.stringify(this.userDetail));
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  downloadcertificate() {
    debugger;
    var url = this.cons.api.downloadForm;
    this.apiService.downloadApiWithToken(url,this.parentData['frmId']).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;
        this.file = result['object'];
        this.openPdfUrlInNewTab(this.file);
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
    // this.openPdfUrlInNewTab('data/mcpets/formCertificate/1695905870795/NAPR005101.pdf');
  }
  openPdfUrlInNewTab(pdfUrl: string): void {

    window.open('http://petregistration.mynoida.co.in/'+'/'+pdfUrl, '_blank');
  }
}
