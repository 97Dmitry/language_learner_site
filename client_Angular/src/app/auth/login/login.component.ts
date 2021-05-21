import { Component } from "@angular/core";

import { LoginService } from "./login.service";
import { Login } from "./login";

@Component({
  selector: "app-auth",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  title = "Login";
  nameUncorrect = false;
  passwordUncorrect = false;

  ngOnInit(): void {}

  login(username: string, user_password: string) {
    username.length < 4
      ? (this.nameUncorrect = true)
      : (this.nameUncorrect = false);
    user_password.length < 6
      ? (this.passwordUncorrect = true)
      : (this.passwordUncorrect = false);
    if (username.length < 4 || user_password.length < 6) {
      return;
    }
    this.loginService.login({ username, user_password });
  }
}
