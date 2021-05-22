import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Login, LoginResponse } from "./login";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  login(loginData: Login): Observable<object> {
    return this.http
      .post<LoginResponse>(`api/login`, loginData, this.httpOptions)
      .pipe(
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
