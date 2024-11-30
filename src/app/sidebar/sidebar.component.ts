import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  naprUserDetail: any;
  detailData: any;
  complaintData: any
  side:any=[
    {
      "title": "Home",
      "icon": "🏠",
      "link": "/home"
    },
    {
      "title": "Profile",
      "icon": "👤",
      "link": "/profile"
    },
    {
      "title": "Settings",
      "icon": "⚙️",
      "submenu": [
        {
          "title": "Account",
          "link": "/settings/account"
        },
        {
          "title": "Privacy",
          "link": "/settings/privacy"
        }
      ]
    },
    {
      "title": "Help",
      "icon": "❓",
      "link": "/help"
    }
  ];
  activeOptionIndex: number | null = null;

  toggleSubmenu(index: number) {
    this.activeOptionIndex = this.activeOptionIndex === index ? null : index;
  }
  constructor(
  ) { }

  ngOnInit(): void {


  }



}
