import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Copy } from 'src/models/copy';
import { Usager } from 'src/models/usager';
import { CopyService } from 'src/app/services/copy.service';
import { Material } from 'src/models/material';
import { MaterialService } from 'src/app/services/material.service';
import { Hire } from 'src/models/hire';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HireService } from 'src/app/services/hire.service';
import { formatDate } from '@angular/common';
import { UsagerServiceService } from 'src/app/services/usager-service.service';
import { Router } from '@angular/router';
import { EventHireService } from 'src/app/services/event-hire.service';
import { EventHire } from 'src/models/eventHire';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-emprunter',
  templateUrl: './emprunter.component.html',
  styleUrls: ['./emprunter.component.scss']
})

export class EmprunterComponent {

  ngModelSelected: Copy | null = null;
  copieId: number | null = null;
  copyT: Copy | null = null;
  utilisateurConnecte: Usager | null = null;
  listeCopies: Copy[] = [];
  listeMaterials: Material[] = [];
  listeEventHires: EventHire[] = [];
  selectedMaterial: string = "";
  selectedEventHire: EventHire | null = null;
  selectedDateDebut: Date | null = null;
  selectedDateDFin: Date | null = null;
  returnCopie?: Copy;

  dateInvalid: boolean = false;

  // à refaire les dcoluns pour la sécurité 
  displayedColumns: string[] = ['id', 'materiel', 'dateDeDepart', 'dateDeRetour', 'status', 'louer'];
  public showTable: boolean = false;

  constructor(
    private connexionService: ConnexionService,
    private copieService: CopyService,
    private materialService: MaterialService,
    private formBuilder: FormBuilder,
    private hireService: HireService,
    private eventHireService: EventHireService,
    private router: Router
  ) { }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDateDebut = event.value;
  }

  onDateFinSelected(event: MatDatepickerInputEvent<Date>) {
    this.selectedDateDFin = event.value;
  }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));

    this.copieService.getCopies().subscribe((copy) => (this.listeCopies = copy));
    this.materialService.getMaterials().subscribe((material) => (this.listeMaterials = material));
    this.eventHireService.getEventHires().subscribe((eventHire) => (this.listeEventHires = eventHire))
    this.raffraichir();
  }

  formHire = this.formBuilder.group({
    pickerDebutController: ['', Validators.required],
    pickerFinController: ['', Validators.required],
  }, { validator: this.dateDebutInfDateFinValidator });


  onDeconnexion() {
    this.connexionService.deconnexion();
  }

  raffraichir(): void {
    this.copieService.getCopies();
  }



  public toggleTable(): void {
    //this.showTable = !this.showTable;
  }




  onFormSubmit() {


    if (this.selectedDateDebut && this.selectedDateDFin) {
      const formattedDateDebut = formatDate(this.selectedDateDebut, 'yyyy-MM-dd', 'fr-FR');
      const formattedDateFin = formatDate(this.selectedDateDFin, 'yyyy-MM-dd', 'fr-FR');
      const dateDebut = formattedDateDebut.toString();
      const dateFin = formattedDateFin.toString();

      const hire: Hire = this.formHire.value as Hire;
      hire.dateHire = dateDebut;
      hire.datePlannedReturn = dateFin;

      hire.copy = this.ngModelSelected!;



      this.listeEventHires.forEach(eventHire => {
        if (eventHire == this.selectedEventHire) {
          hire.eventHire = this.selectedEventHire;
        }
      });




      // ici subscribe car c'est un observable coté requête. 
      this.copieService.changeStatusCopy(this.ngModelSelected!).subscribe();


      // ici récuperation d u user attaché à cette location, il faut vérifier par le biais de la connexion; 
      this.connexionService._utilisateurConnecte.forEach(utilisateur => {
        if (utilisateur !== null) {
          hire.user = utilisateur;
        }
      });

      // une fois le formulaire validé, l'utilisateur est renvoyé vers la page de ses réservations
      if (this.formHire.valid) {
        this.dateInvalid = false;
        this.hireService.passerCommande(hire).subscribe((resultat) => this.router.navigateByUrl('accueil/mes-reservations'));
      } else {
        this.dateInvalid = true;
        console.log("Invalid date values");
      }
    }
  }


  dateDebutInfDateFinValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const pickerDebut = control.get('pickerDebutController');
    const pickerFin = control.get('pickerFinController');

    if (pickerDebut && pickerFin && pickerDebut.value && pickerFin.value) {
      const dateDebut = new Date(pickerDebut.value);
      const dateFin = new Date(pickerFin.value);

      if (dateDebut > dateFin) {

        return { 'dateInvalid': true };
      }
    }

    return null;
  }

}


