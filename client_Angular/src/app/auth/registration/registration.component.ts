import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RegistrationService } from "./registration.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent {
  form: FormGroup | any;
  constructor(private registrationService: RegistrationService) {}

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
  registration() {}
}
