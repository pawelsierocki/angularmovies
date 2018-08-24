import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  toLogin : boolean = true;
  toRegister : boolean = false;
  login : string;
  password: string;
  loginRegister : string;
  passwordRegister : string;
  accountIsRegistered : boolean = false;
  loginTaken : boolean = false;
  isLoggedIn : boolean = false;
  wrongData : boolean = false;
  invalidCharacters : boolean = false;
  users : any = [
    {
      login : "psierocki",
      password : "test123"
    }
  ]

  constructor(public router: Router) { }

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

  isValidCharacter(text) {   
    var regExp = /^[a-zA-Z0-9]*$/
    if (!regExp.test(text)) {
       text = '';
       return false;
       }
     else {      
          return true;
       }
  }

  clearFields () : void {
    this.login = '';
    this.password = '';
    this.loginRegister = '';
    this.passwordRegister = '';
  }

  submit() : void{
    let match : boolean = false;
    let obj : any;
    this.users.forEach(element => {
      if ((element.login === this.login) && (element.password === this.password)){
        match = true;
        obj = element;
      }
        
    });

    if (this.isValidCharacter(this.login) == false || this.isValidCharacter(this.password) == false) {
      this.invalidCharacters = true;
         setTimeout(() => {
          this.invalidCharacters = false;
        }, 3000);    

        this.clearFields();
        this.isLoggedIn = false;
    }  
    else if (match) {
      console.log(obj);
      this.isLoggedIn = true;
      localStorage.setItem("isLogged", JSON.stringify(this.isLoggedIn));
      localStorage.setItem("freshLogged", JSON.stringify(true));
      localStorage.setItem("login", obj.login);
      this.router.navigate(['/movies']);
    }
    else{
      this.isLoggedIn = false;
      this.clearFields();
      this.displayMessage();
    }
  }

  register() : void {
    let taken : boolean = false;
    this.users.forEach(element => {
      if (element.login === this.loginRegister)
        taken = true;
    });

    if (this.loginRegister === undefined || this.loginRegister === "" || this.passwordRegister === undefined || this.passwordRegister === "") {
      this.isLoggedIn = false;
      this.clearFields();
      this.displayMessage();

    } else if (this.isValidCharacter(this.loginRegister) == false || this.isValidCharacter(this.passwordRegister) == false) {
      this.invalidCharacters = true;
         setTimeout(() => {
          this.invalidCharacters = false;
        }, 3000);    

        this.clearFields();
        this.isLoggedIn = false;

    } else if (taken) {
        this.loginTaken = true;
        setTimeout(() => {
          this.loginTaken = false;
        }, 3000); 
        this.clearFields();

    } else {
      this.users.push({
        login: this.loginRegister,
        password: this.passwordRegister
      })

      localStorage.setItem('Array', JSON.stringify(this.users));

      this.toLogin = !this.toLogin;
      this.toRegister = !this.toRegister;

      this.clearFields();

      this.accountIsRegistered = true;
      setTimeout(() => {
        this.accountIsRegistered = false;
      }, 5000); 
     
    }
  }
}
