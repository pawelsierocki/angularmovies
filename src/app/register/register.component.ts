import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit{
  
  registerForm: any;
  loginRegister : string;
  passwordRegister : string;
  accountIsRegistered : boolean = false;
  submitted = false;
  loginTaken : boolean = false;
  users : Array<User> = [];

  constructor(public router : Router,
              private formBuilder: FormBuilder) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      formLogin: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (JSON.parse(localStorage.getItem("Array")) != null)
      this.users = JSON.parse(localStorage.getItem("Array"));
    else 
    localStorage.setItem('Array', JSON.stringify(this.users));
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
      this.clearFields();

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

      this.clearFields();

      this.accountIsRegistered = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
        this.accountIsRegistered = false;
      }, 2000); 
    

    }
    }
 
    this.submitted = false;
  }

  clearFields() : void {
    this.loginRegister = '';
    this.passwordRegister = '';
  }
  toLogin() : void {
    this.router.navigate(['/login']);
  }
}
