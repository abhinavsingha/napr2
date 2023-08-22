import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiCall/apiservice.service';
import { ConstantsService } from 'src/app/services/constant/constants.service';
import { CommonService } from 'src/app/services/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-sector',
  templateUrl: './manage-sector.component.html',
  styleUrls: ['./manage-sector.component.scss']
})
export class ManageSectorComponent implements OnInit {

  p: number = 1;
  newSectorForm: FormGroup;
  sectorList: any;
  showListItem: any = 10;
  showUpdateSubmitButton: boolean = false;
  searchText:any;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiserviceService,
    private cons: ConstantsService,
    private common: CommonService) {
    this.newSectorForm = this.formBuilder.group({
      NewSectorName: ['', Validators.required],
      secId: [''],
    });
  }

  ngOnInit(): void {
    this.getSectorList();
  }

  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }


  addSector() {
    // console.log(this.newSectorForm.value.NewSectorName);
    var addSecJson = { "descri": this.newSectorForm.value.NewSectorName }
    this.apiService.postApi(this.cons.api.addNewSectorApiUrl, addSecJson).subscribe({
      next: (v: object) => {
        // console.log(JSON.stringify(addSecJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        //console.log(JSON.stringify(result));
        //{"response":{"msg":"Record Save successfully"},"status":200,"message":"success","production":false}
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.newSectorForm.reset();
        this.getSectorList();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  resetForm() {
    this.newSectorForm.reset();
  }

  getSectorList() {
    this.apiService.getApi(this.cons.api.getSectorListApiUrl).subscribe({
      next: (v: object) => {
        // console.log("getSectorListApiUrl............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        this.sectorList = result['response'];
        for (let i = 0; i < this.sectorList.length; i++) {
          this.sectorList[i].id = i + 1;
        }
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }


  selectBreedToEdit(data: any) {
    // console.log(JSON.stringify(data) + "data");
    this.showUpdateSubmitButton = true;
    this.newSectorForm.patchValue({
      NewSectorName: data.descr,
      secId: data.sectorId,
    });
  }

  updateSector() {
    var updateSecJson = { "descri": this.newSectorForm.value.NewSectorName, "sectorId": this.newSectorForm.value.secId };
    this.apiService.patchApi(this.cons.api.updateSectorApiUrl, updateSecJson).subscribe({
      next: (v: object) => {
        // console.log(JSON.stringify(updateBreedJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        this.showUpdateSubmitButton = false;
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.newSectorForm.reset();
        this.getSectorList();
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
        var url = this.cons.api.deleteSecApiUrl + data.sectorId;
        this.apiService.deleteApi(url).subscribe({
          next: (v: object) => {
            let result: { [key: string]: any } = v;
            this.common.presentAlert('Success', result['response'].msg, 'success');
            this.newSectorForm.reset();
            this.getSectorList();
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
