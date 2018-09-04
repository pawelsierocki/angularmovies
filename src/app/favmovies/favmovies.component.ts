import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favmovies',
  templateUrl: './favmovies.component.html',
  styleUrls: ['./favmovies.component.css']
})
export class FavmoviesComponent implements OnInit {

  path : string = `https://image.tmdb.org/t/p/w200`;
  favMovies : Array<any> = [];
  
  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("login")) {
      this.router.navigate(['/movies']);
    }

    if(localStorage.getItem("favMovies")) {
      this.favMovies = JSON.parse(localStorage.getItem("favMovies"));
    }
  }

  delete() {
    this.favMovies = JSON.parse(localStorage.getItem("favMovies"));
  }
}
