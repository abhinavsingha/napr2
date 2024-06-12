import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  /// serviceUrl = "http://3.108.194.147:8080/Naprwebdev/"; //prod

  //serviceUrl = "http://43.205.195.179:8080/Naprwebdev/"; //prod

  //serviceUrl = "http://15.206.123.29:8081/Naprwebdev/"; //prod
  // imageUrl = "http://15.206.123.29:8081/"; //prod

   // serviceUrl="http://petregistration.mynoida.co.in/Naprwebdev/";
   serviceUrl="http://192.168.100.238:3000/";
   imageUrl = "http://petregistration.mynoida.co.in/";
   serviceUrlNew = "http://petregistration.mynoida.co.in/webapi/"


  api = {
    "loginApiUrl": this.serviceUrl + "user/loginWebApi",
    "dashboardApiUrl": this.serviceUrl + "dashboard/getAllDashboardDetails",
    "villageDataApiUrl": this.serviceUrl + "addressVillage/getAllVillage",
    "breedTypeDataApiUrl": this.serviceUrl + "breed/getBreedById/",
    "petCategoryDataApiUrl": this.serviceUrl + "petCatMobile/getAllCategry",
    "addNewSectorApiUrl": this.serviceUrl + "sector/saveSector",
    "addVillageApiUrl": this.serviceUrl + "addressVillage/saveVillage",
    "addBreedApiUrl": this.serviceUrl + "sector/saveBreeds",
    "addSocietyApiUrl": this.serviceUrl + "society/saveSociety",
    "addNotiApiUrl": this.serviceUrl + "sector/saveNotification",
    "getbreedListApiUrl": this.serviceUrl + "sector/getBreeds",
    "getSocietyListApiUrl": this.serviceUrl + "society/getAllScoicty",
    "getSectorListApiUrl": this.serviceUrl + "sector/getAllSector",
    "getDoctorListApiUrl": this.serviceUrl + "vaccinationForm/getAllDoctorList",
    "updateBreedDataApiUrl": this.serviceUrl + "sector/updateBreeds",
    "updateSocietyDataApiUrl": this.serviceUrl + "society/updateSociety",
    "updateSectorApiUrl": this.serviceUrl + "sector/updateSector",
    "updateVillageApiUrl": this.serviceUrl + "addressVillage/updateVillage",
    "deleteVillageApiUrl": this.serviceUrl + "addressVillage/deleteVillage/",
    "deleteSecApiUrl": this.serviceUrl + "sector/deleteSector/",
    "deleteBreedApiUrl": this.serviceUrl + "sector/deleteBreeds/",
    "deleteSocietyApiUrl": this.serviceUrl + "society/deleteSociety/",
    "changePasswordApiUrl": this.serviceUrl + "user/changePasswordWebApi",
    "notiListApiUrl": this.serviceUrl + "sector/getNotification",
    "getRportApiUrl": this.serviceUrl + "report/data",
    "getPetReportApiUrl": this.serviceUrl + "report/petdata",
    "getComplaintApiUrl": this.serviceUrl + "complaint/getAllComplaintWebApi",
    "getAllUserListApiUrl": this.serviceUrl + "allUserData/detail",
    "getUserDetailsApiUrl": this.serviceUrl + "allUserData/getCustFrmDetails/",
    "getUserListForAdminApiUrl": this.serviceUrl + "allUserData/getAdminData/",
    "getUserListForStaffApiUrl": this.serviceUrl + "allUserData/getStaffData/",
    "appRejApiUrl": this.serviceUrl + "allUserData/approvedRejectForm",
    "petDetailsApiUrl": this.serviceUrl + "allUserData/getFrmDetails/",
    downloadForm: this.serviceUrlNew+'mainForm/downloadForm'

  }

}
