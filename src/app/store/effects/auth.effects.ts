import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserAutoLogin, UserAutoLoginFail, UserAutoLoginSuccess, UserLogin, UserLoginFail, UserLoginSuccess, UserLogout, } from '../actions/user.actions';

@Injectable()
export class AuthEffects {
  loginUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserLogin),
      mergeMap((action) => this.authService.doLogin(action.username, action.password).pipe(
        map((user) => UserLoginSuccess({user})),
        catchError((error: Error) => of(UserLoginFail({errorMessage: error.message}))),
      )),
    ),
  );

  loggedInUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserLoginSuccess),
    tap(() => {
      this.router.navigate(['/dashboard']);
    }),
  ), {
    dispatch: false,
  });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserLogout),
    tap(() => {
      this.authService.doLogout();
      this.router.navigate(['/']);
    }),
  ), {
    dispatch: false,
  });

  autoLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserAutoLogin),
      mergeMap(() => this.authService.checkActiveLogin().pipe(
        map((user) => UserAutoLoginSuccess({user})),
        catchError((error: Error) => of(UserAutoLoginFail({errorMessage: error.message}))),
      )),
    ),
  );

  /**
   * Constructor
   * @param {AuthService} authService
   * @param {Actions} actions$
   * @param {Router} router
   */
  constructor(private authService: AuthService, private actions$: Actions, private router: Router) {
  }
}
