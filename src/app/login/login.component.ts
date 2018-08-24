import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  login : string;
  password: string;
  isLoggedIn : boolean = false;
  wrongData : boolean = false;
  users : any = [
    {
      login : "psierocki",
      password : "test123"
    }
  ]

  constructor(public router: Router) { }

  ngOnInit() {
  }

  displayMessage () : void{
    this.wrongData = true;
    setTimeout(() => {
      this.wrongData = false;
    }, 3000);
  }

  submit() : void{
    if (this.login === this.users[0].login && this.password === this.users[0].password) {
      this.isLoggedIn = true;
      localStorage.setItem("isLogged", JSON.stringify(this.isLoggedIn));
      localStorage.setItem("login", this.login);
      this.router.navigate(['/movies']);
    }
    else{
      this.isLoggedIn = false;
      this.displayMessage();
    }
  }
}
