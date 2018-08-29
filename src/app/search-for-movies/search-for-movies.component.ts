import { Component } from '@angular/core';
import { GetDataService } from '../../shared/services/get-data.service';

@Component({
  selector: 'app-search-for-movies',
  templateUrl: './search-for-movies.component.html',
  styleUrls: ['./search-for-movies.component.css']
})
export class SearchForMoviesComponent{

  globals : any = {
    title : '',
    moviesList : [],
    movies : [],
    errorMessage : '',
    imgPath : `https://image.tmdb.org/t/p/w200`,
    selectedTitle : '',
    checkTitle : '',
    selectedLanguage: '',
    checkLanguage : '',
    selectedAdult: '',
    checkAdult : '',
    page : 1,
    moviesSearch : [],
    arrayOfMovies : [],
    index : 0,
    total_pages : 0
   }

  private moviesURL = '';

  constructor(private getDataService: GetDataService) { }

  showDropDownList() {
    var URL = `https://api.themoviedb.org/3/search/movie?&query=${this.globals.title}&api_key=115146a3593f60beb8227811cdc632c4&page=1`
    this.getDataService.getData(URL).subscribe(
        movies => {
          for (let i=0;i<3;i++) {
            if(movies["results"][i]!=null)
              this.globals.moviesList[i] = movies["results"][i];
          }      
        },
        error => this.globals.errorMessage = <any>error
      );
  }

  onKey(event: any) { 
    this.globals.title = event.target.value;
    if (this.globals.title.length > 3){
      this.showDropDownList();
    } else {
      this.globals.moviesList = [];
    }
  }

  getFilteredMovies() : void {
    if ((this.globals.checkAdult != this.globals.selectedAdult) || (this.globals.checkTitle != this.globals.selectedTitle) || (this.globals.checkLanguage != this.globals.selectedLanguage)) {
      this.globals.moviesSearch = [];
      this.globals.page = 1;
    }

    this.globals.checkAdult = this.globals.selectedAdult;
    this.globals.checkTitle = this.globals.selectedTitle;
    this.globals.checkLanguage = this.globals.selectedLanguage;

    this.moviesURL = `https://api.themoviedb.org/3/search/movie?include_adult=${this.globals.checkAdult}&query=${this.globals.checkTitle}&language=${this.globals.checkLanguage}&api_key=115146a3593f60beb8227811cdc632c4&page=${this.globals.page}`;
    
  
    this.getDataService.getData(this.moviesURL).subscribe(
      movies => {
        this.globals.total_pages=movies["total_pages"];
        for (let i=0;i<movies["results"].length;i++){
          this.globals.moviesSearch.push(movies["results"][i]);
        }
        this.globals.page++;  
      },
      error => this.globals.errorMessage = <any>error
    );
  }

}