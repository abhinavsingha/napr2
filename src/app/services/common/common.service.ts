import { Injectable } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  async presentAlert(title: string, msg: string, icon: string) {
    const swal: SweetAlert = _swal as any;
    swal({
      title: title,
      text: msg,
      icon: icon,
    });
  }

}
