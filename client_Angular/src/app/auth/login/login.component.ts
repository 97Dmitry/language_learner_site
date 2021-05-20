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

  ngOnInit(): void {}

  login(username: string, user_password: string) {
    if (!username || !user_password) {
      return;
    }
    this.loginService.login({ username, user_password } as Login).subscribe();
  }
}
