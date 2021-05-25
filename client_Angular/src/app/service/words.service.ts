import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WordsService {
  constructor(private http: HttpClient) {}

  getAllWords(): Observable<object> {
    return this.http.get("api/words");
  }
}
