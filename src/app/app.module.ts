import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { SearchForMoviesComponent } from './search-for-movies/search-for-movies.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { OverviewLengthDirective } from '../shared/directives/overview-length.directive';
import { StarComponent } from '../shared/components/star/star.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { UserInfoComponent } from './menu/user-info/user-info.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptorService } from '../shared/services/loader-interceptor.service';
import { LoaderService } from '../shared/services/loader.service';
import { MovieComponent } from './movie/movie.component';
import { appRoutes } from '../shared/services/routes';
import { GoBackComponent } from './go-back/go-back.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LikesComponent } from './likes/likes.component';
import { FavmoviesComponent } from './favmovies/favmovies.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    SearchForMoviesComponent,
    MoviesDetailsComponent,
    OverviewLengthDirective,
    StarComponent,
    LoginComponent, 
    NotFoundComponent, MenuComponent, UserInfoComponent, LoaderComponent, MovieComponent, GoBackComponent, RegisterComponent, UserDetailsComponent, LikesComponent, FavmoviesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LoaderService,
    {
      provide: 'canDeactivateChanges', 
      useValue: checkDirtyState
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function checkDirtyState(component: UserDetailsComponent) {
  
  for (let control in component.changeForm.controls){
    if(component.changeForm.get(control).dirty)
    component.isDirty = true;
  }

  if(component.isDirty)
    return window.confirm('You have not saved your changes, do you want to cancel ?');
  else
    return true;
  
}