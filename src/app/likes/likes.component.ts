import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  currentUser : User;
  liked : boolean = false;

  @Input() movie ;
  constructor(private toastr : ToastrService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
      if (this.currentUser.favMovies != undefined){
        this.currentUser.favMovies.forEach(el => {
          if (el.id === this.movie.id) {
            this.liked = true;
          }
        })
      }
    
  }

  likeIt() {
    this.liked = !this.liked;

    this.currentUser = JSON.parse(localStorage.getItem("user"));
    
    if (this.liked) {
      if (!this.currentUser.favMovies && this.currentUser.favMovies === undefined) {
        this.currentUser.favMovies = new Array;
        this.currentUser.favMovies.push(this.movie);
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        console.log("First")
      } else {
        this.currentUser = JSON.parse(localStorage.getItem("user"));
        this.currentUser.favMovies.push(this.movie);
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        console.log("Next");
      }
      this.toastr.success(this.movie.original_title+" added to fav movies", 'Huraaaaaah !');
    } else {

    this.currentUser.favMovies.forEach((el,index) => {
      if (el.id === this.movie.id)
      this.currentUser.favMovies.splice(index, 1);
    })

    this.toastr.warning(this.movie.original_title+" removed from fav movies", 'Ouuuuuuuh !');
    localStorage.setItem("user", JSON.stringify(this.currentUser));
    }
    
  }
}
