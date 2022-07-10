import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserActionTypes, UserLogin } from '../../../store/actions/user.actions';
import { selectAuthState } from '../../../store/app.states';
import { AuthState } from '../../../store/reducers/auth.reducers';

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
      this.errorMessage = state.errorMessage;
    });

  }

  public login() {
    this.store.dispatch(UserLogin({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
    }));
  }
}
