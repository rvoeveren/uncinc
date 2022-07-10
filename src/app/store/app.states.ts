import { createFeatureSelector } from '@ngrx/store';
import { AuthReducer, AuthState } from './reducers/auth.reducers';

export interface AppState {
  authState: AuthState;
}

export const reducers = {
  auth: AuthReducer,
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
