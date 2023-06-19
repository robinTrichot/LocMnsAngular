import { Component } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Copy } from 'src/models/copy';
import { Usager } from 'src/models/usager';
import { CopyService } from 'src/app/services/copy.service';
import { Material } from 'src/models/material';
import { MaterialService } from 'src/app/services/material.service';
import { Hire } from 'src/models/hire';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HireService } from 'src/app/services/hire.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { EventHireService } from 'src/app/services/event-hire.service';
import { EventHire } from 'src/models/eventHire';
import { __values } from 'tslib';
import { EMPTY, Subscription, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-emprunter',
  templateUrl: './emprunter.component.html',
  styleUrls: ['./emprunter.component.scss'],
})
export class EmprunterComponent {
  // l'utilisateur connecté
  utilisateurConnecte: Usager | null = null;

  //différentes listes pour afficher les éléments
  listeCopies: Copy[] = [];
  listeMaterials: Material[] = [];
  listeEventHires: EventHire[] = [];

  // variable pour afficher la liste des copies (entierement utilisée côté DOM)
  selectedMaterial: string = '';

  // récuperation de la localisation
  selectedEventHire: EventHire | null = null;

  // les dates récupérées dans les datePickers
  selectedDateDebut: Date | null = null;
  selectedDateDFin: Date | null = null;

  // les booléans pour afficher différents conditions sur le DOM
  dateInvalid: boolean = false;
  selectedCopy: boolean = false;
  differenceInvalid: boolean = false;

  // éléments de la table
  displayedColumns: string[] = [
    'id',
    'materiel',
    'dateDeDepart',
    'dateDeRetour',
    'status',
    'louer',
  ];

  constructor(
    private connexionService: ConnexionService,
    private copieService: CopyService,
    private materialService: MaterialService,
    private formBuilder: FormBuilder,
    private hireService: HireService,
    private eventHireService: EventHireService,
    private router: Router
  ) {}

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDateDebut = event.value;
  }

  onDateFinSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDateDFin = event.value;
  }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur)
    );
    this.copieService
      .getCopies()
      .subscribe((copy) => (this.listeCopies = copy));

    this.materialService
      .getMaterials()
      .subscribe((material) => (this.listeMaterials = material));
    this.eventHireService
      .getEventHires()
      .subscribe((eventHire) => (this.listeEventHires = eventHire));
    this.raffraichir();
  }

  formHire: FormGroup = this.formBuilder.group(
    {
      pickerDebutController: ['', Validators.required],
      pickerFinController: ['', Validators.required],
      radioSelected: ['', Validators.required],
      locationSelected: ['', Validators.required],
    },
    { validator: this.dateDebutInfDateFinValidator }
  );

  onDeconnexion() {
    this.connexionService.deconnexion();
  }

  raffraichir(): void {
    this.copieService.getCopies();
  }

  onFormSubmit() {
    if (this.selectedDateDebut && this.selectedDateDFin) {
      const formattedDateDebut = formatDate(
        this.selectedDateDebut,
        'yyyy-MM-dd',
        'fr-FR'
      );
      const formattedDateFin = formatDate(
        this.selectedDateDFin,
        'yyyy-MM-dd',
        'fr-FR'
      );
      const dateDebut = formattedDateDebut.toString();
      const dateFin = formattedDateFin.toString();

      const hire: Hire = this.formHire.value as Hire;
      hire.dateHire = dateDebut;
      hire.datePlannedReturn = dateFin;
      hire.copy = this.formHire.get('radioSelected')!.value;

      // calcule de la durée
      const date1 = new Date(this.selectedDateDebut);
      const date2 = new Date(this.selectedDateDFin);

      const timerDates =
        (date2.getTime() - date1.getTime() + 86400000) / 86400000;

      console.log(timerDates);

      this.listeEventHires.forEach((eventHire) => {
        if (eventHire == this.selectedEventHire) {
          hire.eventHire = this.selectedEventHire;
        }
      });

      // ici récuperation d'un user attaché à cette location, il faut vérifier par le biais de la connexion;
      this.connexionService._utilisateurConnecte.forEach((utilisateur) => {
        if (utilisateur !== null) {
          hire.user = utilisateur;
        }
      });

      if (this.formHire.valid) {
        this.hireService
          .passerCommande(hire)
          .subscribe((resultat) =>
            this.router.navigateByUrl('accueil/mes-reservations')
          );
        this.copieService
          .changeStatusCopy(this.formHire.get('radioSelected')!.value)
          .subscribe();
      } else if (
        this.formHire.get('radioSelected')!.value.id == null ||
        this.formHire.get('radioSelected')!.value.id == undefined
      ) {
        console.log('il faut selectionner une copie');
        this.selectedCopy = true;
      } else {
        this.dateInvalid = true;
      }
    }
  }

  // fonction dé vérification des dates, la dates de début est elle est inférieur à la date de rendu ?
  // impossible pour un utilisateur de louer sur plus de 9 mois
  dateDebutInfDateFinValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const pickerDebut = group.get('pickerDebutController');
    const pickerFin = group.get('pickerFinController');

    if (pickerDebut && pickerFin && pickerDebut.value && pickerFin.value) {
      const dateDebut = new Date(pickerDebut.value);
      const dateFin = new Date(pickerFin.value);
      console.log('2 - je suis rentré dans la vérif');

      // vérification si la date de début est supérieure à la date de fin:
      if (dateDebut > dateFin) {
        return { dateInvalid: true };
      }

      // vérification si la durée de location est supérieure à neuf mois ou non :
      //récuperation en temps unix et soustraction pour vérifier la différence
      const deltaMilis = dateFin.getTime() - dateDebut.getTime();
      const nineMonthMiliS = 23328000000; // équivalent en milisecondes de 9 mois = 9 mois* 30 jours * 24 heures * 60 heures * 60 minutes * 1000 milisecondes ;

      if (deltaMilis > nineMonthMiliS) {
        return { differenceInvalid: true };
      }
    }
    return null;
  }
}
