import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  @Input() movie;

  path : string = `https://image.tmdb.org/t/p/w200`;
  currentUser : User;

  ngOnInit() {
    if (localStorage.getItem("user")){
      this.currentUser=JSON.parse(localStorage.getItem("user"));
    }
  }
}
