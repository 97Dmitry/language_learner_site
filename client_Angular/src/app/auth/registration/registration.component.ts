import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { RegistrationService } from "./registration.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form: FormGroup | any;
  aSub: Subscription | any;
  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

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
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  registration() {
    this.aSub = this.registrationService
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
