import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { IMenu } from 'src/app/shared/models/menu.model';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;
  public opened = false;
  public menuItems: IMenu[] = [
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard'
    },
    {
      path: '/parcking',
      name: 'parcking',
      icon: 'local_parking'
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      icon: 'subway'
    }
  ];
  public selected = 0;

  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {}
}
