import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/services/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  currentUser : User;
  login : string;
  constructor(public router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.login = this.currentUser.login;
  }

  logout() : void {
    localStorage.removeItem("login");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("user");
    location.reload();
  }
}
