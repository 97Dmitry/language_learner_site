import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { LoginService } from "./login.service";
import { Login } from "./login";

@Component({
  selector: "app-auth",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form: FormGroup | any;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {}
}
