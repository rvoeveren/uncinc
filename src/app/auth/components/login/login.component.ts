import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UserLogin } from '../../../store/actions/user.actions';
import { AuthState } from '../../../store/reducers/auth.reducers';
import { selectAuthState } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage!: string;
  public loginForm!: FormGroup;

  private getAuthState: Observable<any>;

  constructor(private router: Router, private fb: FormBuilder, private store: Store<AuthState>) {
    this.getAuthState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
    });

    this.getAuthState.subscribe((state) => {
      if (state.hasError) {
        this.errorMessage = state.errorMessage;
      }
    });

  }

  public login() {
    this.store.dispatch(UserLogin({
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }));
  }
}
