import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';
import { ConnexionService } from './connexion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService {
  constructor(
    private connexionService: ConnexionService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      const requeteModifie = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + jwt),
      });
      return next.handle(requeteModifie);
    }
    return next.handle(request);
  }
}
