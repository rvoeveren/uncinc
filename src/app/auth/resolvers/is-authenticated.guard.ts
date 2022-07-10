import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {

  /**
   * Constructor
   * @param {Router} router
   */
  public constructor(
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
    // TODO: Check the Store for the actual Auth status, now we're assuming you're not authenticated yet.
    console.log('checking here if you are authenticated, token', localStorage.getItem('token'));
    return localStorage.getItem('token') === null
      ? of(this.router.parseUrl('/auth/login'))
      : of(true);
  }
}
