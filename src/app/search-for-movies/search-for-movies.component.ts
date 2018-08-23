import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../shared/services/get-data.service';

@Component({
  selector: 'app-search-for-movies',
  templateUrl: './search-for-movies.component.html',
  styleUrls: ['./search-for-movies.component.css']
})
export class SearchForMoviesComponent implements OnInit {

  title : string;
  moviesList : any= [];
  movies : any;
  errorMessage : string;
  imgPath = `https://image.tmdb.org/t/p/w200`;
  selectedTitle : string;
  checkTitle : string;
  selectedLanguage: any;
  checkLanguage : any;
  selectedAdult: any;
  checkAdult : any;
  page : number = 1;
  moviesSearch : Array<any> = [];
  arrayOfMovies : Array<any> = [];
  index: number = 0;
  total_pages: number;


  private moviesURL = '';


  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    
  }

  showDropDownList() {
    var URL = `https://api.themoviedb.org/3/search/movie?&query=${this.title}&api_key=115146a3593f60beb8227811cdc632c4&page=1`
    this.getDataService.getData(URL).subscribe(
        movies => {
          for (let i=0;i<5;i++) {
            if(movies["results"][i]!=null)
              this.moviesList[i] = movies["results"][i];
          }      
        },
        error => this.errorMessage = <any>error
      );
  }

  onKey(event: any) { 
    this.title = event.target.value;
    if (this.title.length > 3){
      this.showDropDownList();
    } else {
      this.moviesList = [];
    }
  }

  getFilteredMovies() : void {
    if ((this.checkAdult != this.selectedAdult) || (this.checkTitle != this.selectedTitle) || (this.checkLanguage != this.selectedLanguage)) {
      this.moviesSearch = [];
      this.page = 1;
    }

    this.checkAdult = this.selectedAdult;
    this.checkTitle = this.selectedTitle;
    this.checkLanguage = this.selectedLanguage;

    this.moviesURL = `https://api.themoviedb.org/3/search/movie?include_adult=${this.checkAdult}&query=${this.checkTitle}&language=${this.checkLanguage}&api_key=115146a3593f60beb8227811cdc632c4&page=${this.page}`;
    
  
    this.getDataService.getData(this.moviesURL).subscribe(
      movies => {
        this.total_pages=movies["total_pages"];
        for (let i=0;i<movies["results"].length;i++){
          this.moviesSearch.push(movies["results"][i]);
        }
        this.page++;  
      },
      error => this.errorMessage = <any>error
    );
  }

}