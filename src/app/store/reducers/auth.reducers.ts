import { createReducer, on } from '@ngrx/store';
import { User } from '../../auth/models/user.model';
import { UserLogin, UserLoginFail, UserLoginSuccess } from '../actions/user.actions';

export interface AuthState {
  user?: User;
  isAuthenticated: boolean;
  errorMessage?: string;
  hasError: boolean;
}

export const initialState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  errorMessage: undefined,
  hasError: false,
};


export const AuthReducer = createReducer(
  initialState,
  on(UserLoginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isAuthenticated: true,
      errorMessage: undefined,
      hasError: false,
    };
  }),
  on(UserLoginFail, (state, action) => {
    return {
      ...state,
      isAuthenticated: false,
      errorMessage: action.errorMessage,
      hasError: true,
    };
  }),
);


// (state, { user }) => ({ ...state, user })
