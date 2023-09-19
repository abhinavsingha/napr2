import { Injectable } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import {DatePipe} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private datePipe: DatePipe) { }

  async presentAlert(title: string, msg: string, icon: string) {
    const swal: SweetAlert = _swal as any;
    swal({
      title: title,
      text: msg,
      icon: icon,
    });
  }
  public convertTime(date:string|null){
    // Replace 'inputDateString' with your actual date string in 'yyyy/MM/dd hh:mm:ss tt' format

    let inputDateString = date;

// Parse the input date string into a JavaScript Date object
    if(inputDateString!=null){
      const inputDate = new Date(inputDateString);

// Format the date in 'dd/MM/yyyy hh:mm:ss tt' format
      let formattedDate:string | null = this.datePipe.transform(inputDate, 'dd/MM/yyyy hh:mm:ss a');
      return(formattedDate);
    }
    return('');
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>'+formattedDate); // Output: "19/09/2023 02:30:00 PM"

  }
}
