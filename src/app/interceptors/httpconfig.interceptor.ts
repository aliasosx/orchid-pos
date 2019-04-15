import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators/';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ScreenLoadingComponent } from '../loadings/screen-loading/screen-loading.component';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router, private dialogLoading: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    let dialogRef;
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {
        console.log('Service Response thr Interceptor');
        dialogRef = this.dialogLoading.open(ScreenLoadingComponent, {
          width: '600px',
        });
      }

    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log('err.status', err);
        if (err.status === 401 || err.status === 403) {
          localStorage.clear();
          // alert('Unauthorized Request - In case of Auth Token Expired , Please re-login');
          window.location.reload();
          this.router.navigateByUrl('login');
        }
      }
    }
    ), finalize(() => {
      dialogRef.close();
    }));
  }

}
