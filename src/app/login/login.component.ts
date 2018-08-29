import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/services/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;

  toLogin : boolean = true;
  login : string;
  password: string;
  loginRegister : string;
  passwordRegister : string;
  accountIsRegistered : boolean = false;
  loginTaken : boolean = false;
  isLoggedIn : boolean = false;
  wrongData : boolean = false;
  users : Array<User> = [
    {
      login : "psierocki",
      password : "test123"
    }
  ]

  constructor(public router: Router,
              private formBuilder: FormBuilder) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("Array")) != null)
      this.users = JSON.parse(localStorage.getItem("Array"));
    if (localStorage.getItem("login")) {
      this.router.navigate(['/movies']);
    }

    this.registerForm = this.formBuilder.group({
      formLogin: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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

   if (match) {
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

  onSubmit() : void {
    this.submitted = true;
 

    if (this.registerForm.invalid) {
        return;
    } else {
      
      let taken : boolean = false;
    this.users.forEach(element => {
      if (element.login === this.loginRegister)
        taken = true;
    });

    if (this.loginRegister === undefined || this.loginRegister === "" || this.passwordRegister === undefined || this.passwordRegister === "") {
      this.isLoggedIn = false;
      this.clearFields();
      this.displayMessage();

    } else if (taken) {
        this.loginTaken = true;
        setTimeout(() => {
          this.loginTaken = false;
        }, 3000); 
        this.clearFields();

    } else {
      let newUser = new User;
      
      newUser = {
        login: this.loginRegister,
        password: this.passwordRegister
      }

      this.users.push(newUser);

      localStorage.setItem('Array', JSON.stringify(this.users));

      this.toLogin = !this.toLogin;

      this.clearFields();

      this.accountIsRegistered = true;
      setTimeout(() => {
        this.accountIsRegistered = false;
      }, 5000); 
     
    }
    }
 
    this.submitted = false;
  }
}
