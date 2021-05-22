import { Injectable } from "@angular/core";
import { Registration } from "./registration";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  registration(registrationData: Registration): Observable<object> {
    return this.http.post(
      "api/registration",
      registrationData,
      this.httpOptions
    );
  }
}
