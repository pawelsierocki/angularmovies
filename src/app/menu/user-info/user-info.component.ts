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
  favArr : Array<any>;
  usersArray : Array<User>;

  constructor(public router: Router) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  }

  logout() : void {
    localStorage.removeItem("login");
    localStorage.removeItem("isLogged");

    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.usersArray = JSON.parse(localStorage.getItem("Array"));
  
    this.usersArray.forEach((user, index) => {
      if (user.login === this.currentUser.login)
        this.usersArray.splice(index, 1) 
    })

    this.usersArray.push(this.currentUser);
    localStorage.removeItem("user");
    localStorage.setItem("Array", JSON.stringify(this.usersArray));
    location.reload();
  }
}
