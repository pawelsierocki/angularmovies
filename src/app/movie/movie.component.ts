import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent{

  @Input() movie;

  path : string = `https://image.tmdb.org/t/p/w200`;
}
