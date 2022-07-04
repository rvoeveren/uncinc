import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * TODO: Make neat with route/guard?
   */
  public logout() {
    console.error('logging you out!');
  }
}
