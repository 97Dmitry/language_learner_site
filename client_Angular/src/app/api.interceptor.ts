import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

@Injectable()
export class AddTokenHeadersInterceptor implements HttpInterceptor {
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
      return next.handle(changedReq);
    }
    return next.handle(req);
  }
}

export class RefreshTokenInterceptor {}
