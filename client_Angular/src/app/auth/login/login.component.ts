import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { LoginService } from "./login.service";

@Component({
  selector: "app-auth",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup | any;
  lSub: Subscription | any;
  constructor(private loginService: LoginService, private router: Router) {}

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
    this.loginService.logout().subscribe();
  }

  ngOnDestroy() {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }

  login() {
    this.lSub = this.loginService
      .login({
        username: this.form.value.username,
        user_password: this.form.value.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.warn(error);
        },
      });
  }
}
