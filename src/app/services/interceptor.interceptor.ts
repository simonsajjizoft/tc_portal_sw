import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError,BehaviorSubject } from 'rxjs';
import { GeneralService } from '../services/general.services';
import { AuthService } from './auth.service';
import { ApiService } from './api.services';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { tap, mergeMap, switchMap, filter, take, flatMap } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getAccessToken()}`
                }
              });
              return next.handle(newRequest);
            }),
            catchError((err) => {
              return throwError(() => new Error("New Authentication Error"));
            })
          );
        }
        return throwError(() => new Error("New Authentication Error"));
      })
    );
  }


}
