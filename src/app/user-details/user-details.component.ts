import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  login: string;
  users: Array<User> = [];
  name: string;
  surname: string;
  password: string;
  password_repeat : string;
  file : any;
  isDirty:boolean = true;

  constructor(public router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("login")) {
      this.isDirty = false;
      this.router.navigate(['/movies']);
    }
    this.login = localStorage.getItem("login");
    this.users = JSON.parse(localStorage.getItem("Array"));
    
    this.users.forEach(user => {
      if (user.login === this.login){
        if (user.name)
          this.name = user.name;
        if(user.surname)
          this.surname = user.surname;
        if(user.img) {
          this.file = user.img;
        }
      }
    })
  }

  onSubmit() : void {
    this.users.forEach(usr => {
      if (usr.login === this.login){
        if (usr.name != this.name)
          usr.name = this.name;
        if (usr.surname != this.surname)
          usr.surname = this.surname;
        if (this.password != undefined && this.password != null && this.password === this.password_repeat && this.password.length >= 6) {
          usr.password = this.password;
        } 
        if (this.file) {
          usr.img = this.file;
        }
        localStorage.setItem("user", JSON.stringify(usr));
      }
    })
    this.isDirty = false;
 
    localStorage.setItem("Array", JSON.stringify(this.users));

    let commentsArray = JSON.parse(localStorage.getItem("commentsArray"));

    commentsArray.forEach(element => {
      this.users.forEach(user =>{
        if (element.user.login === user.login){
          console.log(element.user.login)
          element.user = user;
        }
          
      })
    });

    localStorage.setItem("commentsArray", JSON.stringify(commentsArray));
  }

  onFileChanged(event) {
    this.file = event.target.files[0].name;
  }

  onBack() {
    this.router.navigate(['/movies']);
  }
}
