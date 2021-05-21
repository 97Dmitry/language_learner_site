import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Login, UserData } from "./login";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private backendUrl = "http://127.0.0.1:8001/api";

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  login(loginData: Login) {
    return this.http
      .post<UserData>(`${this.backendUrl}/login`, loginData, this.httpOptions)
      .subscribe(
        (response: UserData) => {
          localStorage.setItem("userId", response.user.user_id);
          localStorage.setItem("accessToken", response.tokens.accessToken);
          localStorage.setItem("refreshToken", response.tokens.refreshToken);
          localStorage.setItem("username", response.user.username);
        },
        (error) => console.log(error)
      );
  }
}
