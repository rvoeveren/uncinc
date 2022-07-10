import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserLogin, UserLoginFail, UserLoginSuccess } from '../actions/user.actions';

@Injectable()
export class AuthEffects {

  loginUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserLogin),
        mergeMap((action) => {
          return this.authService.doLogin(action.username, action.password).pipe(
            map((user) => {
              return UserLoginSuccess({user: user});
            }),
            catchError((error: Error) => {
              return of(UserLoginFail({ errorMessage: error.message }));
            }),
          );
        })
      );
    }
      // this.actions$.pipe(
      //   mergeMap((action) => {
      //     return this.authService.doLogin('123', '123').pipe(
      //       map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
      //       catchError(() => EMPTY)
      //     )
      //   })
      // )
  );

  loggedInUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserLoginSuccess),
      tap((action) => {
        // TODO: Move the token setting to some form of AuthService
        localStorage.setItem('token', action.user.token);

        this.router.navigate([`/dashboard`]).then(() => {
          // Could do something here, but we probably won't within the scope of the assignment.
          // Maybe we could add an Action to store the token etc.
        });
      })
    ), {
      dispatch: false,
    });

  loginFailure$ = createEffect(
    () => this.actions$.pipe(
      ofType(UserLoginFail),
      tap((action) => {
        console.error('login failed...', action.errorMessage);

        // this.router.navigate([`/dashboard`]).then(() => {
        //   // Could do something here, but we probably won't within the scope of the assignment.
        //   // Maybe we could add an Action to store the token etc.
        // });
      })
    ), {
      dispatch: false,
    });

  // @Effect({ dispatch: false })
  // LogInFailure: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.LOGIN_FAILURE)
  // );


  /**
   * Constructor
   * @param {AuthService} authService
   * @param {Actions} actions$
   * @param {Router} router
   */
  constructor(private authService: AuthService, private actions$: Actions, private router: Router) {
  }  // private eventService: EventService

}


// // In AuthEffect Class
// login$ = createEffect(() => {
//   return this.actions$.pipe(
//     ofType(AuthActions.loginPage, AuthActions.loginModal),
//     concatMap((action) =>
//       this.authService.login(action.username, action.password).pipe(
//         map((user) => AuthActions.loginSuccess({ user: user })),
//         catchError((error) => of(AuthActions.loginFailure({ error })))
//       )
//     )
//   );
// });
