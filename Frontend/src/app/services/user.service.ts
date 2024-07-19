import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserDto } from '../../model/UserDto';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {LoginRequest} from "../../model/LoginRequest";
import {SignUpRequest} from "../../model/SignUpRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUserUrl = 'http://localhost:8080/api/utente';


  constructor(private http: HttpClient) { }

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.getUserUrl}/all`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  userRegistration(user:SignUpRequest): Observable<SignUpRequest> {
    return this.http.post<SignUpRequest>(`${this.getUserUrl}/reg`, JSON.stringify(user)).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public login(user:LoginRequest) : Observable<LoginRequest>{

    return this.http.post<LoginRequest>(`${this.getUserUrl}/login`, JSON.stringify(user)).pipe(   retry(3),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
      errorMessage = `A client-side or network error occurred: ${error.error}`;
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was:`, error.error);
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}








