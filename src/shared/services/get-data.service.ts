import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor( private http: HttpClient ){}
  
  getData(moviesURL) : Observable<object> {
    return this.http.get<object>(moviesURL).pipe(
    tap(data => console.log(data)),
    catchError(this.handleError)
    );
  }
  
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status}, error message is ${err.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
