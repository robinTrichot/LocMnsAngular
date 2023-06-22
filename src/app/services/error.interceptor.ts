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

  test: boolean = false;

  constructor(private connexionService: ConnexionService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: any, caught: any) => {
        if (error.status === 403) {
          this.connexionService.deconnexion();
          return throwError(new Error('Votre token est arrivé à expiration'));
        } else if (error.status === 409) {

        

          return throwError(
            new Error("Cet utilisateur existe déjà, l'email est déjà pris")
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
