import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CatApiKeyInterceptor implements HttpInterceptor {
  private key = '46fb8983-9c67-462a-9e60-32279c08b674';

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('x-api-key', this.key),
    });

    return next.handle(authReq);
  }
}
