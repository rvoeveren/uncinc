import { createAction, props } from '@ngrx/store';

import { User } from '../../auth/models/user.model';

export enum UserActionTypes {
  Login = '[User] LOGIN',
  LoginSuccess = '[User] LOGIN SUCCEEDED',
  LoginFail = '[User] LOGIN FAILED',
  Logout = '[User] LOGOUT',
  AutoLogin = '[User] AUTO LOGIN',
  AutoLoginSuccess = '[User] AUTO LOGIN SUCCEEDED',
  AutoLoginFail = '[User] AUTO LOGIN FAILED',
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

export const UserLogout = createAction(
  UserActionTypes.Logout,
);

export const UserAutoLogin = createAction(
  UserActionTypes.AutoLogin,
);

export const UserAutoLoginSuccess = createAction(
  UserActionTypes.AutoLoginSuccess,
  props<{ user: User }>()
);

export const UserAutoLoginFail = createAction(
  UserActionTypes.AutoLoginFail,
  props<{ errorMessage: string }>()
);
