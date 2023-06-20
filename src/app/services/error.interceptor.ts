import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ConnexionService } from './connexion.service';
import { Injectable } from '@angular/core';


// cet interceptor a pour objectif d'intercepter les erreurs 

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor {
  constructor(private connexionService: ConnexionService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: any, caught: any) => {
        this.connexionService.deconnexion();
        return throwError(
          () => new Error('Votre token est arrivé à expiration')
        );
      })
    );
  }
}
