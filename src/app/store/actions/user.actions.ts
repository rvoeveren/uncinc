import { createAction, props } from '@ngrx/store';

import { User } from '../../auth/models/user.model';

export enum UserActionTypes {
  Login = '[User] LOGIN',
  LoginSuccess = '[User] LOGIN_SUCCEEDED',
  LoginFail = '[User] LOGIN_FAILED',
}

export const UserLogin = createAction(
  UserActionTypes.Login,
  props<{ username: string, password: string }>()
);

export const UserLoginSuccess = createAction(
  UserActionTypes.LoginSuccess,
  props<{ user: User }>()
);

export const UserLoginFail = createAction(
  UserActionTypes.LoginFail,
  props<{ errorMessage: string }>()
);

// export class Login implements Action {
//   readonly type = UserActionTypes.LOGIN;
//
//   constructor(public payload: User) {
//   }
// }
//
// export class LoginSucceeded implements Action {
//   readonly type = UserActionTypes.LOGIN_SUCCEEDED;
//
//   constructor(public payload: User) {
//   }
// }
//
// export class LoginFailed implements Action {
//   readonly type = UserActionTypes.LOGIN_FAILED;
//
//   constructor(public payload: User) {
//   }
// }
//
// export type All = | Login | LoginSucceeded;

// export type UserActions = Login | LoginSucceeded | LoginFailed;
