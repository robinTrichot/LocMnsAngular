import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Usager } from 'src/models/usager';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  utilisateurConnecte: Usager | null = null;
  isAdmin: boolean = false;

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
    private router: Router
  ) { }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => {
        this.utilisateurConnecte = utilisateur;
        this.isAdmin = utilisateur?.role?.role === "ROLE_ADMIN";
      }
    );
  }

  onDeconnexion() {
    this.connexionService.deconnexion();
    this.router.navigate(['/connexion']);
  }
}
