import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAutoLogin } from './store/actions/user.actions';
import { AuthState } from './store/reducers/auth.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Constructor
   * @param {Store<AuthState>} store
   */
  constructor(private store: Store<AuthState>) {
  }

  /**
   * On app load, we do a simple AutoLogin if User has rights to
   * @return void
   */
  public ngOnInit(): void {
    this.store.dispatch(UserAutoLogin());
  }

}
