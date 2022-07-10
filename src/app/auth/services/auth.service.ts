import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';

export const ACCESS_TOKEN_NAME: string = 'auth.access_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isAuthenticatedSubject: BehaviorSubject<boolean>;

  /**
   * Constructor
   * @param {Router} router
   */
  public constructor(private router: Router) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  }

  /**
   * Return whether the player has a valid access token (i.e., is authenticated).
   *
   * @return string { The access token for the current authenticated player }.
   */
  public getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_NAME) || '';
  }

  /**
   * Attempts to log the player into the authenticated area, based on provided credentials.
   *
   * @param username
   * @param password
   */
  public doLogin(username: string, password: string): Observable<User> {

    // Normally we would of course post to the backend/api but in this case we can check it hardcoded.
    const isLoginDataCorrect: boolean = (username === 'uncinc') && (password === 'letmein');
    console.error('login?', isLoginDataCorrect, username, password);
    if (!isLoginDataCorrect) {
      return throwError(() => new Error('Username and/or password are incorrect. Try again.'));
    }

    return of({
      token: '%#@-some-jwt-lookalike-token-to-fake-being-logged-in-123',
      email: 'uncincuser@uncinc.nl',
      hash: 'fake-user-hash-12345',
    });
  }

  /**
   * Logs the player out of the game by removing references to the access token.
   */
  public doLogout(): Observable<boolean> {
    return of(true);
    // const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    // const httpOptions = {
    //   withCredentials: true,
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   }),
    // };
    //
    // return this.http.delete(API_ENDPOINT + 'logout', httpOptions).pipe(
    //   finalize(() => {
    //     this.clearAccessTokenAndRestartApp();
    //   }),
    // );
  }
}
