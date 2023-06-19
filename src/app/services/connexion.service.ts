import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usager } from 'src/models/usager';


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  public _utilisateurConnecte: BehaviorSubject<Usager | null> = new BehaviorSubject<Usager | null>(null);


  constructor(private http: HttpClient,
    private router: Router) {

    this.updateUserConnecte();
  }

  connexion(utilisateur: Usager): Observable<string> {
    return this.http
      .post(
        'http://localhost:8080/user/connexion', utilisateur, {
        responseType: 'text',
      })
  }

  updateUserConnecte() {

    const jwt = localStorage.getItem("jwt");
    if (jwt != null) {

      const data = jwt.split('.')[1];
      const json = window.atob(data);
      const donneesUtilisateur = JSON.parse(json);
      const utilisateur: Usager = {
        mail: donneesUtilisateur.sub,
        lastname: donneesUtilisateur.lastname,
        firstname: donneesUtilisateur.firstname,
        id: donneesUtilisateur.idTest,
        role: {
          role: donneesUtilisateur.role,
          wording: donneesUtilisateur.wording
        },
        nomImageProfil: donneesUtilisateur.nomImageProfil
      }
      this._utilisateurConnecte.next(utilisateur);
    } else {
      this._utilisateurConnecte.next(null);
    }
  }

  deconnexion() {
    localStorage.removeItem("jwt");
    this._utilisateurConnecte.next(null)
    this.router.navigateByUrl("/connexion");
  }


}
