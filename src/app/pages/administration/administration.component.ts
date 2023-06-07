import { Component } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Usager } from 'src/models/usager';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
  utilisateurConnecte: Usager | null = null;

  joursSemaine = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  dateToday = new Date();

  jourSemaine = this.joursSemaine[this.dateToday.getDay()];
  jour = this.dateToday.getDate();
  moisAnnee = this.mois[this.dateToday.getMonth()];
  annee = this.dateToday.getFullYear();

  dateFormatee = `${this.jourSemaine} ${this.jour} ${this.moisAnnee} ${this.annee}`;

  constructor(
    private connexionService: ConnexionService,
  ) { }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => {
        this.utilisateurConnecte = utilisateur;
      }
    );
  }

  onDeconnexion() {
    this.connexionService.deconnexion();
  }
}
