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
import { StarComponent } from '../shared/components/star/star.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { MoviesDetailsGuard } from './movies-details/movies-details.guard';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    SearchForMoviesComponent,
    MoviesDetailsComponent,
    OverviewLengthDirective,
    StarComponent,
    LoginComponent, 
    NotFoundComponent, MenuComponent, UserInfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'movies', component: MoviesListComponent },
      { path: 'search', 
      canActivate: [ MoviesDetailsGuard ],
      component: SearchForMoviesComponent },
      { path: 'movies/:id/:lang', component: MoviesDetailsComponent },
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: '404', component: NotFoundComponent},
      { path: '**', redirectTo: '/404'}
    ]),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
