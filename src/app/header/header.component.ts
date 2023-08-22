import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  //isShow: any;
  naprUserDetail: any;
  //isAuthenticated: boolean = true;

  constructor(private router: Router,
    private authService: AuthenticationService) {
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
        this.authService.logoutUser();
        // this.loggedIn = false;
      } else if (result.isDenied) {
        // User clicked "No" button
        // Perform any other action
      }
    });
  }

}
