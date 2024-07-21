import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { UserDto } from '../../model/UserDto';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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


  login(user: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.getUserUrl}/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${error.error.message}`;
    } else {

      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}








