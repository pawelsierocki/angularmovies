import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SearchForMoviesComponent } from './search-for-movies/search-for-movies.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { OverviewLengthDirective } from '../shared/directives/overview-length.directive';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    SearchForMoviesComponent,
    MoviesDetailsComponent,
    OverviewLengthDirective, 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'movies', component: MoviesListComponent },
      { path: 'search', component: SearchForMoviesComponent },
      { path: 'movies/:id/:lang', component: MoviesDetailsComponent },
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: '**', redirectTo: 'movies', pathMatch: 'full' }
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
