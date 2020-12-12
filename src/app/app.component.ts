import { Component, OnInit } from "@angular/core";
import { AuthService } from './user/auth.service';

@Component({
  selector: "app-root",
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.checkAuthenticatedStatus();
  }
}
