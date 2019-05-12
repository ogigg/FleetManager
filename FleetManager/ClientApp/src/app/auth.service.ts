import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:9220/api/auth/';

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', data)
      .pipe(
        tap(_ => this.log('login'))
      );
  }
  
  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', data)
      .pipe(
        tap(_ => this.log('login'))
      );
  }
  getUserName(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'getUserName')
      .pipe(
        tap(_ => this.log('getUserName'))
      );
  }
  
  
  private log(message: string) {
    //console.log(message);
  }
}
