import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../shared/services/get-data.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})

export class MoviesListComponent implements OnInit {

  globals : any = {
    errorMessage : '',
    movies : [],
    index : 0,
    arrayOfMovies : [],
    maxLength : 250,
    global_page : 1,
    freshLoggedIn : false
  }
  
  

  private moviesURL = 'https://api.themoviedb.org/3/discover/movie?api_key=115146a3593f60beb8227811cdc632c4&sort_by=vote_average.desc&include_adult=false&include_video=false&page='+this.globals.global_page;
  constructor(private getDataService: GetDataService) { }

  getMovies (){
    this.getDataService.getData(this.moviesURL).subscribe(
      movies => {
        this.globals.movies = movies["results"],
        this.selectMovies()
      },
      error => this.globals.errorMessage = <any>error
    );
  } 
  
  selectMovies() : void {
    let length : number = this.globals.movies.length;
    if (this.globals.arrayOfMovies.length === 0) {
      for (let i=0;i<3;i++){
        this.globals.arrayOfMovies.push(this.globals.movies[i]);
        this.globals.index++;
      }
    } else {
      for (let i=this.globals.index;i<this.globals.index+3;i++){
        if (this.globals.index === length){
          this.globals.global_page++;
          this.globals.index=0;
          this.moviesURL = 'https://api.themoviedb.org/3/discover/movie?api_key=115146a3593f60beb8227811cdc632c4&sort_by=vote_average.desc&include_adult=false&include_video=false&page='+this.globals.global_page;
          break;
        } else {
          this.globals.arrayOfMovies.push(this.globals.movies[this.globals.index])
          this.globals.index++;
        }
      }
    }
    
  }

  ngOnInit() {
    this.getMovies();

    if (JSON.parse(localStorage.getItem("freshLogged"))) {
      this.globals.freshLoggedIn = true;
      setTimeout(() => {
        this.globals.freshLoggedIn = false;
        localStorage.removeItem("freshLogged");
      }, 3000); 
    }
  }

}
