import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtWUser, LoginForm } from 'src/interfaces';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_ENDPOINT: String = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) {
  }

  login(loginForm: LoginForm): Observable<JwtWUser> {
    return this.http.post<JwtWUser>(
      this.AUTH_ENDPOINT + 'login',
      loginForm,
      httpOptions
    )

  }

  logout(): Observable<any> {
    return this.http.post(
      this.AUTH_ENDPOINT + 'signout', 
      { },
      httpOptions
    );
  }
}

