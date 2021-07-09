import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CLOTHING_STORE_API, CLOTHING_STORE_AUTH_API } from 'src/app/app-injections-tokens';
import { Login } from 'src/models/auth/login';
import { tap } from 'rxjs/operators';
import { User } from 'src/models/user/user';
import { Observable } from 'rxjs';

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authApiUrl: string = this.baseAuthApiUrl + '/api/auth/login'; 

  constructor(
    private http: HttpClient,
    @Inject(CLOTHING_STORE_AUTH_API) private baseAuthApiUrl: string,
    @Inject(CLOTHING_STORE_API) private baseApiUrl: string,
    private router: Router
  ) { }

  get isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getAuthUser(): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + '/api/my/info');
  }

  login(login: Login) {
    return this.http.post<any>(this.authApiUrl, login)
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
        })
      );
  }

  logout() {
    const removeToken = localStorage.removeItem(ACCESS_TOKEN_KEY);
    if (removeToken == null) {
      this.router.navigate(['sign-in']);
    }
  }

}
