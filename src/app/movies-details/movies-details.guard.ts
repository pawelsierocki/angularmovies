import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesDetailsGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let isLoggedIn = JSON.parse(localStorage.getItem("isLogged"));
    console.log(isLoggedIn);
    if (isLoggedIn != true){
      this.router.navigate(['/login'])
      return false;
    };
    return true;
  }
}
