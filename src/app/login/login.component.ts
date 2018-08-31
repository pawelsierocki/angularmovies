import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/services/user';
import { HashPasswordService } from '../../shared/services/hash-password.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login : string;
  password: any;
  isLoggedIn : boolean = false;
  wrongData : boolean = false;
  users : Array<User> = [
    {
      login : "psierocki",
      password : "test123"
    }
  ]

  constructor(public router: Router,
              public hasher : HashPasswordService) { }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("Array")) != null)
      this.users = JSON.parse(localStorage.getItem("Array"));
    if (localStorage.getItem("login")) {
      this.router.navigate(['/movies']);
    }
  }

  displayMessage () : void{
    this.wrongData = true;
    setTimeout(() => {
      this.wrongData = false;
    }, 3000);
  }

  clearFields () : void {
    this.login = '';
    this.password = '';
  }

  submit() : void{
    let match : boolean = false;
    let obj : any;
    this.users.forEach(element => {
      if ((element.login === this.login) && (element.password === this.hasher.hashPassword(this.password))){
        match = true;
        obj = element;
      }
        
    });

   if (match) {
      this.isLoggedIn = true;
      localStorage.setItem("isLogged", JSON.stringify(this.isLoggedIn));
      localStorage.setItem("freshLogged", JSON.stringify(true));
      localStorage.setItem("login", obj.login);
      localStorage.setItem("user", JSON.stringify(obj));
      this.router.navigate(['/movies']);
    }
    else{
      this.isLoggedIn = false;
      this.clearFields();
      this.displayMessage();
    }
  }


  toRegister() : void {
    this.router.navigate(['/register']);
  }
}
