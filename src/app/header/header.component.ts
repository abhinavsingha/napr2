import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //isShow: any;
  naprUserDetail: any;
  //isAuthenticated: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.naprUserDetail = JSON.parse(localStorage.getItem('naprUserDetail') || '');
  }


  async logout() {
    const result = await Swal.fire({
      title: 'Are you sure. You want to logout?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      //console.log(JSON.stringify(result) + "=====");
      if (result.isConfirmed) {
        // User clicked "Yes" button
        // this.loggedIn = false;
      } else if (result.isDenied) {
        // User clicked "No" button
        // Perform any other action
      }
    });
  }

}
