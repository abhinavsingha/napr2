import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../services/apiCall/apiservice.service';
import { ConstantsService } from '../../services/constant/constants.service';
import { CommonService } from '../../services/common/common.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-breeds',
  templateUrl: './manage-breeds.component.html',
  styleUrls: ['./manage-breeds.component.scss']
})
export class ManageBreedsComponent implements OnInit {

  breedDetailData: any;
  p: number = 1;
  petCatgData: any;
  addNewBreedFrom: FormGroup;
  breedList: any;
  showListItem: any = 10;
  showUpdateSubmitButton: boolean = false;
  searchText:any;

  constructor(private apiService: ApiserviceService,
    private cons: ConstantsService,
    private formBuilder: FormBuilder,
    private common: CommonService) {
    this.addNewBreedFrom = this.formBuilder.group({
      petCategory: ['', Validators.required],
      breedName: ['', Validators.required],
      breedId: [''],
    });
  }

  ngOnInit(): void {
    this.getPetCategory();
    this.getBreedList();
  }


  getBreedData($event: any) {

    // console.log($event.target.value + "=====");

    // return;
    // var url = this.cons.api.breedTypeDataApiUrl + '01'
    // console.log(url + '++++++');
    // this.apiService.getApiWithToken(url).subscribe({
    //   next: (v: object) => {
    //     console.log("breedTypeDataApiUrl............" + JSON.stringify(v));
    //     return;
    //     let result: { [key: string]: any } = v;
    //     this.breedDetailData = result['response'];
    //     for (let i = 0; i < this.breedDetailData.length; i++) {
    //       this.breedDetailData[i].id = i + 1;
    //     }
    //   },
    //   error: (e) => {
    //     console.log(JSON.stringify(e) + "========");
    //     this.common.presentAlert('Error', e['error'].response.message, 'error');
    //   },
    //   complete: () => console.info('complete')
    // });
  }

  listItemVal($event: any) {
    this.showListItem = $event.target.value;
  }

  resetForm() {
    this.addNewBreedFrom.reset();
  }

  getPetCategory() {
    this.apiService.getApi(this.cons.api.petCategoryDataApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.petCatgData = result['response'];
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  addBreed() {
    var addSecJson = { "catId": this.addNewBreedFrom.value.petCategory, "descr": this.addNewBreedFrom.value.breedName };
    // console.log(JSON.stringify(addSecJson));
    this.apiService.postApi(this.cons.api.addBreedApiUrl, addSecJson).subscribe({
      next: (v: object) => {
        //console.log(JSON.stringify(addSecJson) + "JSON.stringify(v)............" + JSON.stringify(v));
        let result: { [key: string]: any } = v;
        //  console.log(JSON.stringify(result));
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.addNewBreedFrom.reset();
        this.getBreedList();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  getBreedList() {
    this.apiService.getApi(this.cons.api.getbreedListApiUrl).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.breedList = result['response'];
        for (let i = 0; i < this.breedList.length; i++) {
          this.breedList[i].id = i + 1;
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
    this.addNewBreedFrom.patchValue({
      petCategory: data.catId,
      breedName: data.petName,
      breedId: data.breedId
    });
  }

  updateBreedData() {
    var updateBreedJson = { "catId": this.addNewBreedFrom.value.petCategory, "descr": this.addNewBreedFrom.value.breedName, "breedId": this.addNewBreedFrom.value.breedId };
    this.apiService.patchApi(this.cons.api.updateBreedDataApiUrl, updateBreedJson).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        this.showUpdateSubmitButton = false;
        this.common.presentAlert('Success', result['response'].msg, 'success');
        this.addNewBreedFrom.reset();
        this.getBreedList();
      },
      error: (e) => {
        this.common.presentAlert('Error', e['error'].response.message, 'error');
      },
      complete: () => console.info('complete')
    });
  }

  async deleteBreed(data: any) {
    const result = await Swal.fire({
      title: 'Are you sure. You want to delete?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        var url = this.cons.api.deleteBreedApiUrl + data.breedId;
        this.apiService.deleteApi(url).subscribe({
          next: (v: object) => {
            let result: { [key: string]: any } = v;
            this.common.presentAlert('Success', result['response'].msg, 'success');
            this.addNewBreedFrom.reset();
            this.getBreedList();
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
