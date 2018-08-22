import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { GetDataService } from '../../shared/services/get-data.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {

  movie : any ;
  errorMessage : string;
  movieURL: string;
  title: string;
  overview : string;
  releaseTime : string;
  voteAverage : string;
  posterPath : string;
  trailer_source : string;
  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private getDataService: GetDataService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    let id : number = +this.route.snapshot.paramMap.get('id');
    let language : string = this.route.snapshot.paramMap.get('lang');
    this.movieURL = `https://api.themoviedb.org/3/movie/${id}?language=${language}&api_key=115146a3593f60beb8227811cdc632c4`;
    this.getMovies();
  }

  getMovies (){
    this.getDataService.getData(this.movieURL).subscribe(
      movies => {
        this.movie = movies,
        this.setMovie();
      },
      error => this.errorMessage = <any>error
    );
  } 

  getTrailer () {
    var URLtrailer = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=`+ this.title  +` movie trailer` +`&key=AIzaSyBiKFoE1NRuRAXNLsZQlV-j-59qeRqPI-c`
    this.getDataService.getData(URLtrailer).subscribe(
      data => {
        this.trailer_source = "https://www.youtube.com/embed/" +data["items"][0].id.videoId;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.trailer_source);
      },
      error => this.errorMessage = <any>error
    );
  }

  setMovie () {
    this.title = this.movie.original_title;
    this.getTrailer();
    this.overview = this.movie.overview;
    this.releaseTime = this.movie.release_date;
    this.voteAverage = this.movie.vote_average;
    if (this.movie.poster_path != null ) {
      this.posterPath = `https://image.tmdb.org/t/p/w200` +this.movie.poster_path;
    } else {
      this.posterPath = '../../assets/img/default.png';
    }
  }

  onBack(): void {
    this.router.navigate(['/movies']);
  }
}
