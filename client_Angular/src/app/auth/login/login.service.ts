import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Login } from "./login";

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
    return this.http.post<Login>(
      `${this.backendUrl}/login`,
      loginData,
      this.httpOptions
    );
  }
}
