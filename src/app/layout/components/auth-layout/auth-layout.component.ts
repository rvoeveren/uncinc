import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models/user.model';
import { UserLogout } from '../../../store/actions/user.actions';
import { AuthState } from '../../../store/reducers/auth.reducers';
import { selectAuthState } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  private getAuthState: Observable<any>;
  public user!: User;

  constructor(private router: Router, private store: Store<AuthState>) {
    this.getAuthState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getAuthState.subscribe((state) => {
      if (state.isAuthenticated) {
        this.user = state.user;
      }
    });
  }

  /**
   * Logs out the user by removing the token from the local storage
   *
   * @return void
   */
  public logout(): void {
    this.store.dispatch(UserLogout());
  }
}
