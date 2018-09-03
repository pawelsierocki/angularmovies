import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/services/user';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HashPasswordService } from '../../shared/services/hash-password.service'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {

  isDirty : boolean = false;
  updated : boolean = false;
  submitted : boolean = false;
  changeForm: any;
  login: string;
  users: Array<User> = [];
  name: string;
  surname: string;
  password: string;
  password_repeat : string;
  file : any;

  commentExist: boolean = false;
  commentsArray : Array<Comment>;
  userCommentsArray : Array<Comment> = [];
              
   passwordMatchValidator(comp: UserDetailsComponent) : ValidatorFn {
     
    return (control: AbstractControl) : ValidationErrors => {
      return comp.password != control.value ? { mismatch: true } : null;
    }
  }

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              public hasher : HashPasswordService) { 
                this.changeForm = this.formBuilder.group({
                  password: ['', Validators.minLength(6)],
                  password_repeat: ['', [Validators.minLength(6), this.passwordMatchValidator(this)]],
                  name: [],
                  surname: []
                });
              }
  
  get f() {return this.changeForm.controls;}

  ngOnInit() {
    

    if (!localStorage.getItem("login")) {
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

    this.commentsArray = JSON.parse(localStorage.getItem("commentsArray"));
    if(this.commentsArray) {
      this.commentExist = true;
      this.commentsArray.forEach(el => {
        if(el["user"].login === this.login) {
          this.userCommentsArray.push(el);
        }
      });
    }
    
  }

  onSubmit() : void {

  this.submitted = true;

  if (this.changeForm.invalid) {
      return;
  } else {

    this.updated = true;
    setTimeout(() => {
      console.log('working')
      this.updated = false;
    }, 3000);

    this.users.forEach(usr => {
      if (usr.login === this.login){
        if (usr.name != this.name)
          usr.name = this.name;
        if (usr.surname != this.surname)
          usr.surname = this.surname;
        if (this.password != undefined && this.password != null && this.password === this.password_repeat && this.password.length >= 6) {
          usr.password = this.hasher.hashPassword(this.password);
        } 
        if (this.file) {
          usr.img = this.file;
        }
        localStorage.setItem("user", JSON.stringify(usr));
      }
    })

    localStorage.setItem("Array", JSON.stringify(this.users));

    let commentsArray = JSON.parse(localStorage.getItem("commentsArray"));

    commentsArray.forEach(element => {
      this.users.forEach(user =>{
        if (element.user.login === user.login){
          element.user = user;
        }    
      })
    });

    localStorage.setItem("commentsArray", JSON.stringify(commentsArray));
    this.changeForm.reset();
  }
  }

  onFileChanged(event) {
    this.file = event.target.files[0].name;
  }

  onBack() {
    this.router.navigate(['/movies']);
  }

  visitSite(id, language) {
    this.router.navigate([`/movies/${id}/${language}`]);
  }
}
