import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from '../services/connexion.service';

@Injectable({
  providedIn: 'root'
})


export class AdminGuard implements CanActivate {

  constructor(
    private connexionService: ConnexionService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.connexionService._utilisateurConnecte.value?.role?.role == "ROLE_ADMIN") {
      return true;
    } else {
      return this.router.parseUrl("/connexion");
    }

  }

}
