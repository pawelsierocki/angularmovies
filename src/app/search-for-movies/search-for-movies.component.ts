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

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    
  }

  showDropDownList(title) {
    var URL = `https://api.themoviedb.org/3/search/movie?&query=${this.title}&api_key=115146a3593f60beb8227811cdc632c4&page=1`
    this.getDataService.getData(URL).subscribe(
        movies => {
          this.moviesList = movies["results"]
        },
        error => this.errorMessage = <any>error
      );
  }

  onKey(event: any) { 
    this.title = event.target.value;
    if (this.title.length > 3){
      this.showDropDownList(this.title);
    } else {
      this.moviesList = [];
    }
  }

}


/*

var showDropDownList = function (title) {
        var URL = `https://api.themoviedb.org/3/search/movie?&query=${title}&api_key=115146a3593f60beb8227811cdc632c4&page=1`
        let moviesList = [];
        let movies;
    
            getData(URL).then(data=>{
                movies = data;
                document.querySelector('.dropdown-content').innerHTML = "";
                document.querySelector('.dropdown-content').insertAdjacentHTML('beforeend', `<input type="text" placeholder="Search.." id="search" onkeyup="appController.filterFunction()`);
                for (var i=0;i<5;i++){
                    moviesList[i] = movies.results[i];
                    if ((moviesList[i]) != undefined ) {
                        let id = moviesList[i].id;
                        let title = moviesList[i].original_title;
                        let language = moviesList[i].language;
                        document.querySelector('.dropdown-content').insertAdjacentHTML('beforeend', `<a href="#" onclick="return appController.sendDetails('${id}','${title}','${language}')">${movies.results[i].original_title}</a>`);
                    }
                    
                }
                
                
            })
            
    }

    */