import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["../auth.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup | any;
  rSub: Subscription | any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordConfirmation: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy() {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  registration() {
    this.rSub = this.authService
      .registration({
        username: this.form.value.username,
        user_email: this.form.value.email,
        user_password: this.form.value.password,
      })
      .subscribe({
        next: () => {
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.warn(error);
        },
      });
  }
}
