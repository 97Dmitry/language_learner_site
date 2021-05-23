import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenHandlerInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.accessToken) {
      const changedReq = req.clone({
        headers: req.headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("accessToken")}`
        ),
      });
      return next.handle(changedReq).pipe(
        catchError((error: HttpErrorResponse): Observable<any> => {
          if (error.status === 401) {
            this.http
              .post("api/refresh-token", {
                refreshToken: localStorage.getItem("refreshToken"),
              })
              .subscribe({
                next: (value: any) => {
                  localStorage.setItem("accessToken", value.tokens.accessToken);
                  localStorage.setItem(
                    "refreshToken",
                    value.tokens.refreshToken
                  );
                  console.log("Token has refreshed. Please, reload page");
                },
                error: (error: HttpErrorResponse): Observable<any> => {
                  if (error.status === 400) {
                    localStorage.clear();
                    this.router.navigate(["/login"]);
                    return throwError(
                      () => new Error("RefreshToken is corrupt")
                    );
                  }
                  localStorage.clear();
                  this.router.navigate(["/login"]);
                  return throwError(
                    () => new Error("Some error with RefreshToken")
                  );
                },
              });
          }
          return throwError(() => new Error("Token has expired"));
        })
      );
    }
    return next.handle(req);
  }
}
