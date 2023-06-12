import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { HireService } from 'src/app/services/hire.service';
import { Hire } from 'src/models/hire';
import { Usager } from 'src/models/usager';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GestionLocationPopUpComponent } from 'src/app/popups/gestion-location-pop-up/gestion-location-pop-up.component';
import { CommonModule } from '@angular/common';
import { Copy } from 'src/models/copy';

@Component({
  selector: 'app-gestion-locations',
  templateUrl: './gestion-locations.component.html',
  styleUrls: ['./gestion-locations.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
})
export class GestionLocationsComponent {

  listeHires: Hire[] = [];
  utilisateurConnecte: Usager | null = null;

  constructor(private hireService: HireService,
    private connexionService: ConnexionService,
    private dialog: MatDialog
  ) { }

date1? : Date;
date2? : Date;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, hire: Hire): void {
    this.dialog.open(GestionLocationPopUpComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: hire
    });
  }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));
    this.hireService.getHires().subscribe((hire) => (this.listeHires = hire))



    this.raffraichir();
  }

  raffraichir(): void {
    this.hireService.getHires();
  }



}



