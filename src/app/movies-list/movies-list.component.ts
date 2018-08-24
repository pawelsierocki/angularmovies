import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../shared/services/get-data.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  imgPath = `https://image.tmdb.org/t/p/w200`;
  errorMessage : string;
  movies: any;
  index : number = 0;
  arrayOfMovies : Array<any> = [];
  maxLength : number = 250;
  global_page : number = 1;
  freshLoggedIn : boolean = false;

  private moviesURL = 'https://api.themoviedb.org/3/discover/movie?api_key=115146a3593f60beb8227811cdc632c4&sort_by=vote_average.desc&include_adult=false&include_video=false&page='+this.global_page;
  constructor(private getDataService: GetDataService) { }

  getMovies (){
    this.getDataService.getData(this.moviesURL).subscribe(
      movies => {
        this.movies = movies["results"],
        this.selectMovies()
      },
      error => this.errorMessage = <any>error
    );
  } 
  
  selectMovies() : void {
    let length : number = this.movies.length;
    if (this.arrayOfMovies.length === 0) {
      for (let i=0;i<3;i++){
        this.arrayOfMovies.push(this.movies[i]);
        this.index++;
      }
    } else {
      for (let i=this.index;i<this.index+3;i++){
        if (this.index === length){
          this.global_page++;
          this.index=0;
          this.moviesURL = 'https://api.themoviedb.org/3/discover/movie?api_key=115146a3593f60beb8227811cdc632c4&sort_by=vote_average.desc&include_adult=false&include_video=false&page='+this.global_page;
          break;
        } else {
          this.arrayOfMovies.push(this.movies[this.index])
          this.index++;
        }
      }
    }
    
  }


  ngOnInit() {
    this.getMovies();

    if (JSON.parse(localStorage.getItem("freshLogged"))) {
      this.freshLoggedIn = true;
      setTimeout(() => {
        this.freshLoggedIn = false;
        localStorage.removeItem("freshLogged");
      }, 3000); 
    }
  }

}
