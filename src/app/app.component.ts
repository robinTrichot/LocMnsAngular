import { Component } from '@angular/core';
import { Usager } from 'src/models/usager';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  utilisateurConnete: Usager | null = null;

  constructor(
    private connexionService: ConnexionService
  ) { }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnete = utilisateur));
  }

  onDeconnexion() {
    this.connexionService.deconnexion();
  }
}
