import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'NAPR';
  isShow = false;
  stepper: any;

  constructor(private location: LocationStrategy
  ) {
    history.pushState(null, "null", window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, "null", window.location.href);
    });
  }


  showHideNav(event: any) {
    this.isShow = !(event instanceof LoginComponent);
  }
}
