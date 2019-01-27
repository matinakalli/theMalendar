import { TokenService } from './token.service';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler,
  HttpInterceptor, HttpEvent, HttpResponse,
  HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private http: HttpClient, private tokenService: TokenService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    const re = '/login';

    if (token) {
      // we cannot modify the http request object but we can clone it and add modification there
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)      // add a new Auth Header
      });
      return next.handle(cloned);
    } else if (req.url.search('/login') === -1 || req.url.search('/register') === -1 ) {
      // Exclude interceptor for login and register request:
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)      // add a new Auth Header
      });
    } else {
      next.handle(req);   // pass our request
    }
    return next.handle(req);
  }
}
