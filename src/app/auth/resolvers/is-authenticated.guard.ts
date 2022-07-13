import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';
import { AuthState } from '../../store/reducers/auth.reducers';
import { isAuthenticated } from '../../store/selectors/auth.selectors';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {

  /**
   * Constructor
   * @param {AuthService} authService
   * @param {Store<AuthState>} store
   * @param {Router} router
   */
  public constructor(
    private authService: AuthService,
    private store: Store<AuthState>,
    private router: Router,
  ) {
  }

  /**
   * Can the url be activated based on the current authentication status of the User?
   *
   * @param next
   * @param state
   *
   * @return boolean | UrlTree
   */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map((authenticated: boolean) => {
        return authenticated ? true : this.router.parseUrl('/auth/login');
      })
    );

  }
}
