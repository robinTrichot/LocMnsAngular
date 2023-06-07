import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';
import { EventHireService } from 'src/app/services/event-hire.service';
import { HireService } from 'src/app/services/hire.service';
import { Hire } from 'src/models/hire';
import { Usager } from 'src/models/usager';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.scss']
})
export class MesReservationsComponent {

  utilisateurConnecte: Usager | null = null;
  listHires: Hire[] = [];

  constructor(
    private connexionService: ConnexionService,
    private hireService: HireService,
    private eventHireService: EventHireService,
    private router: Router
  ) { }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));

    if (this.utilisateurConnecte?.id != null) {
      this.hireService.getHireByUser(this.utilisateurConnecte.id).subscribe((hires) => this.listHires = hires);
    }
    this.raffraichir();
  }

  raffraichir(): void {
    this.hireService.getHireByUser(2);
  }

}
