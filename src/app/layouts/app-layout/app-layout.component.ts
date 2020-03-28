import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
  opened = false;

  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {}
}
