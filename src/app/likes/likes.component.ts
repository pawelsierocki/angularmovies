import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  liked : boolean = false;
  favMovies : Array<any> = [];

  @Input() movie ;
  constructor(private toastr : ToastrService) { }

  ngOnInit() {
    this.favMovies = JSON.parse(localStorage.getItem("favMovies"));

    this.favMovies.forEach(el => {
      if (el.id === this.movie.id) {
        this.liked = true;
      }
    })
  }

  likeIt() {
    this.liked = !this.liked;

    if (this.liked) {
      this.toastr.success(this.movie.original_title+" added to fav movies", 'Huraaaaaah !');
      if (!localStorage.getItem("favMovies")) {
        this.favMovies.push(this.movie);
        localStorage.setItem("favMovies", JSON.stringify(this.favMovies));
      } else {
        this.favMovies = JSON.parse(localStorage.getItem("favMovies"));
        this.favMovies.push(this.movie);
        localStorage.setItem("favMovies", JSON.stringify(this.favMovies));
      }
    } else {
    this.toastr.warning(this.movie.original_title+" removed from fav movies", 'Ouuuuuuuh !');

    this.favMovies.forEach((el,index) => {
      if (el.id === this.movie.id)
      this.favMovies.splice(index, 1);
    })
    localStorage.setItem("favMovies", JSON.stringify(this.favMovies));
    }
    
  }
}
