import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ConnexionService } from './connexion.service';

@Injectable()
export class EmailVerificationInterceptor implements HttpInterceptor {
  constructor(private connexionService: ConnexionService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: any, caught: any) => {
        if (error.status === 409) {
          this.connexionService.deconnexion();
          return throwError(new Error('Cet utilisateur existe déjà, l\'email est déjà pris'));
        } else {
          return throwError(error);
        }
      })
    );
  }
}
