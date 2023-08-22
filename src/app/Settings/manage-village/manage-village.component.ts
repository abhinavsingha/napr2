import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiCall/apiservice.service';
import { ConstantsService } from '../../services/constant/constants.service';
import { CommonService } from '../../services/common/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-village',
  templateUrl: './manage-village.component.html',
  styleUrls: ['./manage-village.component.scss']
})
export class ManageVillageComponent implements OnInit {

  villDetailData: any;
  p: number = 1;
  showListItem: any = 10;
  searchText:any;
  newVillageForm: FormGroup;
  sectorList: any;
  showUpdateSubmitButton: boolean = false;

  constructor(private apiService: ApiserviceService,
    private cons: ConstantsService,
    private common: CommonService,
    private formBuilder: FormBuilder,
  ) {
    this.newVillageForm = this.formBuilder.group({
      newVillageName: ['', Validators.required],
      villageId: [''],
    });
  }

  ngOnInit(): void {
    this.getVillageData();
  }

  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }

  getVillageData() {
    this.apiService.getApi(this.cons.api.villageDataApiUrl).subscribe({
      next: (v: object) => {
        // console.log("villageDataApiUrl............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        this.villDetailData = result['response'];
        for (let i = 0; i < this.villDetailData.length; i++) {
          this.villDetailData[i].id = i + 1;
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  resetForm() {
    this.newVillageForm.reset();
  }

  addVill() {
    // console.log(this.newVillageForm.value.NewSectorName);
    var addVillJson = { "description": this.newVillageForm.value.newVillageName }
    this.apiService.postApi(this.cons.api.addVillageApiUrl, addVillJson).subscribe({
      next: (v: object) => {
        //  console.log(JSON.stringify(addVillJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        // console.log(JSON.stringify(result));
        //{"response":{"msg":"Record Save successfully"},"status":200,"message":"success","production":false}
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.newVillageForm.reset();
        this.getVillageData();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }


  selectVillage(data: any) {
    this.showUpdateSubmitButton = true;
    this.newVillageForm.patchValue({
      newVillageName: data.descr,
      villageId: data.villageId,
    });
  }

  updateVillage() {
    var updateVillageJson = { "description": this.newVillageForm.value.newVillageName, "villageId": this.newVillageForm.value.villageId };
    this.apiService.patchApi(this.cons.api.updateVillageApiUrl, updateVillageJson).subscribe({
      next: (v: object) => {
       // console.log(JSON.stringify(updateVillageJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        this.showUpdateSubmitButton = false;
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.newVillageForm.reset();
        this.getVillageData();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }



  async deleteVillage(data: any) {
    const result = await Swal.fire({
      title: 'Are you sure. You want to delete?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        var url = this.cons.api.deleteVillageApiUrl + data.villageId;
        this.apiService.deleteApi(url).subscribe({
          next: (v: object) => {
            let result: { [key: string]: any } = v;
            this.common.presentAlert('Success', result['response'].msg, 'success');
            this.newVillageForm.reset();
            this.getVillageData();
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
