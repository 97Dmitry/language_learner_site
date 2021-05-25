import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { RegistrationForm, LoginForm, LoginResponse } from "../interfaces/auth";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //   }),
  // };

  registration(registrationData: RegistrationForm): Observable<object> {
    return this.http.post("api/registration", registrationData);
  }

  login(loginData: LoginForm): Observable<object> {
    return this.http.post<LoginResponse>(`api/login`, loginData).pipe(
      tap((value) => {
        localStorage.setItem("userId", value.user.user_id);
        localStorage.setItem("accessToken", value.tokens.accessToken);
        localStorage.setItem("refreshToken", value.tokens.refreshToken);
        localStorage.setItem("username", value.user.username);
      })
    );
  }

  logout() {
    localStorage.clear();
  }
}
