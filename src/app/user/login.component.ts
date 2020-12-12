import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../user/auth.service";
@Component({
  templateUrl: "./login.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  username;
  password;
  mouseoverLogin;
  constructor(private authService: AuthService, private router: Router) {}

  login(values) {
    this.authService.loginUser(values.userName, values.password);
    this.router.navigate(["/events"]);
  }

  handleCancel() {
    this.router.navigate(["/events"]);
  }
}
