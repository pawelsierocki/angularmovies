import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { GetDataService } from '../../shared/services/get-data.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Comment } from '../../shared/services/comment'
import { ToastrService } from 'ngx-toastr';

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
    trailer_source :  '',
    commentText : '',
    id : '',
    language: '',
    user : ''
  }

  selectedComments : Array<Comment> = [];
  allComments : Array<Comment> = [];
  urlSafe: SafeResourceUrl;

  constructor(private route: ActivatedRoute,
              private getDataService: GetDataService,
              public sanitizer: DomSanitizer,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.globals.user = JSON.parse(localStorage.getItem("user"));
    this.globals.id = +this.route.snapshot.paramMap.get('id');
    this.globals.language = this.route.snapshot.paramMap.get('lang');
    this.globals.movieURL = `https://api.themoviedb.org/3/movie/${this.globals.id}?language=${this.globals.language}&api_key=115146a3593f60beb8227811cdc632c4`;
    
    if (localStorage.getItem("commentsArray")){
      this.allComments = JSON.parse(localStorage.getItem("commentsArray"));
      console.log(this.allComments)
      this.allComments.forEach(comment => {
        if (comment.film_id === this.globals.id)
          this.selectedComments.push(comment);
      });
    }
  
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

  setMovie () : void{
    this.getTrailer();
    if (this.globals.movie.poster_path != null ) {
      this.globals.posterPath = `https://image.tmdb.org/t/p/w200` +this.globals.movie.poster_path;
    } else {
      this.globals.posterPath = '../../assets/img/default.png';
    }
  }
  
  addComment() : void {
    if (this.globals.commentText.replace(/\s/g, '').length) {
      let comment = {
        comment: this.globals.commentText, 
        film_id :this.globals.id, 
        film_language: this.globals.language, 
        title: this.globals.movie.original_title,
        user: this.globals.user
      }
      this.allComments.push(comment);
      this.selectedComments.push(comment);
      
      this.globals.commentText = '';
      localStorage.setItem("commentsArray", JSON.stringify(this.allComments));
      this.toastr.success('Comment successfully added !', 'Huraaaaaah !');
    } else {
      this.toastr.error("You need to type something first!","Ouuuuuuups")
    }
    
  }
}
