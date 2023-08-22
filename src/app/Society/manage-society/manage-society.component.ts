import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiCall/apiservice.service';
import { ConstantsService } from '../../services/constant/constants.service';
import { CommonService } from '../../services/common/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-manage-society',
  templateUrl: './manage-society.component.html',
  styleUrls: ['./manage-society.component.scss']
})
export class ManageSocietyComponent implements OnInit {

  addSocietyForm: FormGroup;
  showUpdateSubmitButton: boolean = false;
  societyList: any;
  showListItem: any = 10;
  p: number = 1;
  searchText:any;  


  constructor(private apiService: ApiserviceService,
    private cons: ConstantsService,
    private SpinnerService: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private common: CommonService) {
    this.addSocietyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      societyId: [''],
    });

  }

  ngOnInit(): void {
    this.getSocietyList();
  }


  listItemVal($event: any) {
    this.showListItem = $event.target.value;
    
  }


  getSocietyList() {
    this.apiService.getApi(this.cons.api.getSocietyListApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.societyList = result['response'];
        for (let i = 0; i < this.societyList.length; i++) {
          this.societyList[i].id = i + 1;
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }


  addSociety() {
    var addSocietyJson = { "address": this.addSocietyForm.value.address, "contact_no": this.addSocietyForm.value.contactNo, "name": this.addSocietyForm.value.name };
    // console.log(JSON.stringify(addSecJson));
    this.SpinnerService.show();
    this.apiService.postApi(this.cons.api.addSocietyApiUrl, addSocietyJson).subscribe({
      next: (v: object) => {
       // console.log(JSON.stringify(addSocietyJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        this.SpinnerService.hide();
        //  console.log(JSON.stringify(result));
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.addSocietyForm.reset();
        this.getSocietyList();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  selecToEdit(data: any) {
    //console.log(JSON.stringify(data) + "data");
    this.showUpdateSubmitButton = true;
    this.addSocietyForm.patchValue({
      name: data.name,
      address: data.address,
      contactNo: data.contact_no,
      societyId: data.manageSocietyId
    });
  }

  updateData() {
    var updateJson = {
      "manageSocietyId": this.addSocietyForm.value.societyId,
      "address": this.addSocietyForm.value.address,
      "contact_no": this.addSocietyForm.value.contactNo,
      "name": this.addSocietyForm.value.name
    };
   // console.log(JSON.stringify(updateJson));
    this.apiService.postApi(this.cons.api.updateSocietyDataApiUrl, updateJson).subscribe({
      next: (v: object) => {
       // console.log(JSON.stringify(updateJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        this.showUpdateSubmitButton = false;
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.addSocietyForm.reset();
        this.getSocietyList();
      },
      error: (e) => {

       // console.log(JSON.stringify(e) + "=====");
        this.common.presentAlert('Error', e['message'], 'error');
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }



  async delete(data: any) {
    const result = await Swal.fire({
      title: 'Are you sure. You want to delete?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        var url = this.cons.api.deleteSocietyApiUrl + data.manageSocietyId;
        this.apiService.deleteApi(url).subscribe({
          next: (v: object) => {
            let result: { [key: string]: any } = v;
            this.common.presentAlert('Success', result['response'].msg, 'success');
            this.addSocietyForm.reset();
            this.getSocietyList();
          },
          error: (e) => {
            this.common.presentAlert('Error', e['error'].response.message, 'error');
          },
          complete: () => console.info('complete')
        });
      } else if (result.isDenied) {
        // User clicked "No" button
        // Perform any other action
      }
    });
  }

}
