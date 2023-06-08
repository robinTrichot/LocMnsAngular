import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CopyService } from 'src/app/services/copy.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hire } from 'src/models/hire';
import { HireService } from 'src/app/services/hire.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Usager } from 'src/models/usager';

@Component({
  selector: 'app-gestion-location-pop-up',
  templateUrl: './gestion-location-pop-up.component.html',
  styleUrls: ['./gestion-location-pop-up.component.scss']
})
export class GestionLocationPopUpComponent {

  utilisateurConnecte: Usager | null = null;
  listeHires: Hire[] = [];

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Hire,
    private copieService: CopyService,
    private hireService: HireService,
    private connexionService: ConnexionService
  ) { }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));
    this.hireService.getHires().subscribe((hire) => (this.listeHires = hire))
    this.raffraichir();
  }

  raffraichir(): void {
    this.hireService.getHires();
  }

  onSubmit() {
    this.hireService.validateHire(this.data).subscribe();
  }
}

export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}
