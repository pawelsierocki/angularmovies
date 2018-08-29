import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  login : string;
  constructor(public router: Router) {}

  ngOnInit() {
    this.login = localStorage.getItem("login");
  }

  logout() : void {
    localStorage.removeItem("login");
    localStorage.removeItem("isLogged");
    location.reload();
  }
}
