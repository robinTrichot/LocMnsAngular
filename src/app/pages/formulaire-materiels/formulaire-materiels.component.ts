import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';
import { Usager } from 'src/models/usager';
import { Material } from 'src/models/material';
import { MaterialService } from 'src/app/services/material.service';
import { TrademarkMaterial } from 'src/models/trademarkMaterial';
import { TrademarkService } from 'src/app/services/trademark.service';


@Component({
  selector: 'app-formulaire-materiels',
  templateUrl: './formulaire-materiels.component.html',
  styleUrls: ['./formulaire-materiels.component.scss']
})
export class FormulaireMaterielsComponent {

  isAdmin: boolean = false;
  utilisateurConnecte: Usager | null = null;

  idMaterial?: number;
  codeRetour: number = 0;
  messageErreur: string = '';
  fichier: File | null = null;
  notice: File | null = null;
  listTrademarks: TrademarkMaterial[] = [];

  formulaire: FormGroup = this.formBuilder.group({
    wording: ['', [Validators.required]],
    trademarkMaterial: [null, [Validators.required]]
  });

  constructor(
    private materialService: MaterialService,
    private connexionService: ConnexionService,
    private serviceMaterial: MaterialService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceTrademark: TrademarkService,

  ) { }

  ngOnInit() {

    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));

    this.raffraichir();

    this.serviceTrademark.getTrademarks().subscribe({
      next: listTrademarks => this.listTrademarks = listTrademarks,
      error: erreur => console.log(erreur)
    });

    this.route.params.subscribe((parametres) => {
      this.idMaterial = parametres['id'];

      if (this.idMaterial != null) {
        this.serviceMaterial.getMaterial(this.idMaterial).subscribe({
          next: (material: Material) => {
            this.formulaire.get('wording')?.setValue(material.wording); // le "?" ne pas oublier que ça renvoit soit un un truc soit un null, au cas c'est null on lui dit faire un truc en fait
            this.formulaire.get('trademark')?.setValue(material.trademarkMaterial)
          },

          error: (erreurRequete) => {
            if (erreurRequete.status === 404) {
              this.codeRetour = 404;
            } else {
              this.codeRetour = 500;
              this.messageErreur = erreurRequete.message;
            }
          },
        });
      }
    });
  }

  raffraichir(): void {
    this.materialService.getMaterials();
  }

  onDeconnexion() {
    this.connexionService.deconnexion();
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const formData = new FormData();

      const material: Material = this.formulaire.value; // donc on recupere le formulaire ici
      material.id = this.idMaterial; // + un id; 

      console.log('Valeurs saisies dans le formulaire :', material);

      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      if (this.notice) {
        formData.append('notice', this.notice);
      }

      formData.append(
        'material',
        new Blob([JSON.stringify(material)], {
          type: 'application/json',
        })
      );

      this.serviceMaterial
        .editionMaterial(formData) // ici on passe plutôt le formadata, ce n'est plus un body raw mais un body formdata qu'on envoit
        .subscribe((resultat) => this.router.navigateByUrl('/administration/gestion-materiels'));
      this.raffraichir();
    }
  }

  onImageSelectionnee(event: any) {
    this.fichier = event.target.files[0];
  }

  onNoticeSelectionnee(event: any) {
    this.notice = event.target.files[0];
  }

  compareTrademark(trademarkOption: any, trademarkMaterial: any) {
    return (trademarkMaterial != null && trademarkMaterial.id == trademarkOption.id
    )
  }

}
