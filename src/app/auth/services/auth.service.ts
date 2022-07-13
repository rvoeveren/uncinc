import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError, } from 'rxjs';

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
   * @return string|undefined
   */
  public getAccessToken(): string | undefined {
    return localStorage.getItem(ACCESS_TOKEN_NAME) || undefined;
  }

  /**
   * Sets the current access token
   * @return void
   */
  public setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_NAME, token);
  }

  /**
   * Attempts to log the player into the authenticated area, based on provided credentials.
   *
   * @param username
   * @param password
   */
  public doLogin(username: string, password: string): Observable<User> {
    // Normally we would of course post to the backend but in this case we can check it hardcoded.
    const isLoginDataCorrect: boolean = (username === 'uncinc') && (password === 'letmein');
    if (!isLoginDataCorrect) {
      return throwError(() => new Error('Username and/or password are incorrect. Try again.'));
    }

    const accessToken: string = '%#@-some-jwt-lookalike-token-to-fake-being-logged-in-123';
    this.setAccessToken(accessToken);

    return of({
      email: 'uncincuser@uncinc.nl',
      hash: 'fake-user-hash-12345',
      fullName: 'UNCINC Authenticated User',
      token: accessToken,
    });
  }

  /**
   * Checks whether the User is still logged in.
   * @returns {Observable<User>}
   */
  public checkActiveLogin(): Observable<User> {
    // Normally would do API check on expiration of token etc., but now we assume it's all cool.
    const token: string | undefined = this.getAccessToken();
    if (token) {
      return of({
        fullName: 'UNCINC Authenticated User',
        token: this.getAccessToken(),
        email: 'uncincuser@uncinc.nl',
        hash: 'fake-user-hash-12345',
      });
    }

    return throwError(() => new Error('Could not auto-login'));
  }

  /**
   * Logs the player out of the game by removing references to the access token.
   * @return void
   */
  public doLogout(): void {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }
}
