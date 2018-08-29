import { MoviesDetailsGuard } from "../../app/movies-details/movies-details.guard";
import { SearchForMoviesComponent } from "../../app/search-for-movies/search-for-movies.component";
import { MoviesDetailsComponent } from "../../app/movies-details/movies-details.component";
import { MoviesListComponent } from "../../app/movies-list/movies-list.component";
import { LoginComponent } from "../../app/login/login.component";
import { NotFoundComponent } from "../../app/not-found/not-found.component";
import { RegisterComponent } from "../../app/register/register.component";
import { Routes } from "@angular/router";

export const appRoutes : Routes = [
            { path: 'movies', component: MoviesListComponent },
            { path: 'search', 
            canActivate: [ MoviesDetailsGuard ],
            component: SearchForMoviesComponent },
            { path: 'movies/:id/:lang', component: MoviesDetailsComponent },
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
            { path: '', redirectTo: 'movies', pathMatch: 'full' },
            { path: '404', component: NotFoundComponent},
            { path: '**', redirectTo: '/404'}
    ]