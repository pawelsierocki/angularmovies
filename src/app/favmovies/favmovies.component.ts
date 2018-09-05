import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-favmovies',
  templateUrl: './favmovies.component.html',
  styleUrls: ['./favmovies.component.css']
})
export class FavmoviesComponent implements OnInit {

  path : string = `https://image.tmdb.org/t/p/w200`;
  favMovies : Array<any> = [];
  currentUser : User ;
  ifDeleted : boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("login")) {
      this.router.navigate(['/movies']);
    }
  
    if(localStorage.getItem("user")) {
      this.currentUser = JSON.parse(localStorage.getItem("user"));
      this.favMovies = this.currentUser.favMovies;
    }
  }

  delete() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.favMovies = this.currentUser.favMovies;
  }
}
