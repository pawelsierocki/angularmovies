import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { GetDataService } from '../../shared/services/get-data.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {

  globals : any = {
    movie : [],
    errorMessage : '',
    movieURL: '',
    posterPath :  '',
    trailer_source :  ''
  }

  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private getDataService: GetDataService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let id : number = +this.route.snapshot.paramMap.get('id');
    let language : string = this.route.snapshot.paramMap.get('lang');
    this.globals.movieURL = `https://api.themoviedb.org/3/movie/${id}?language=${language}&api_key=115146a3593f60beb8227811cdc632c4`;
    this.getMovies();
  }

  getMovies (){
    this.getDataService.getData(this.globals.movieURL).subscribe(
      movies => {
        console.log(this.globals.movieURL);
        console.log(movies)
        this.globals.movie = movies,
        this.setMovie();
      },
      error => this.globals.errorMessage = <any>error
    );
  } 

  getTrailer () {
    var URLtrailer = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=`+ this.globals.movie.original_title  +` movie trailer` +`&key=AIzaSyBiKFoE1NRuRAXNLsZQlV-j-59qeRqPI-c`
    this.getDataService.getData(URLtrailer).subscribe(
      data => {
        this.globals.trailer_source = "https://www.youtube.com/embed/" +data["items"][0].id.videoId;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.globals.trailer_source);
      },
      error => this.globals.errorMessage = <any>error
    );
  }

  setMovie () {
    this.getTrailer();
    if (this.globals.movie.poster_path != null ) {
      this.globals.posterPath = `https://image.tmdb.org/t/p/w200` +this.globals.movie.poster_path;
    } else {
      this.globals.posterPath = '../../assets/img/default.png';
    }
  }
}
