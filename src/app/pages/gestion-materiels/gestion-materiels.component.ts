import { Component } from '@angular/core';
import { Material } from 'src/models/material';
import { MaterialService } from 'src/app/services/material.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Usager } from 'src/models/usager';
import { UsagerServiceService } from 'src/app/services/usager-service.service';



@Component({
  selector: 'app-gestion-materiels',
  templateUrl: './gestion-materiels.component.html',
  styleUrls: ['./gestion-materiels.component.scss']
})
export class GestionMaterielsComponent {

  utilisateurConnecte: Usager | null = null;
  materialsList: Material[] = [];

  displayedColumns: string[] = ['id', 'wording', 'pictureName', 'notice', 'trademarkMaterial', 'Edit'];

  isAdmin: boolean = false;
  search: string = '';

  constructor(
    private materialService: MaterialService,
    private connexionService: ConnexionService,

    private imageCompress: NgxImageCompressService,

  ) {}

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (
        this.isAdmin = utilisateur?.role.role == "ROLE_ADMIN"));

    this.materialService._materials.subscribe(
      (materials) => (this.materialsList = materials));

    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));
  

    this.raffraichir();
  }

raffraichir(): void {
  this.materialService.getMaterialsWithPicture();
}
  onDeconnexion() {
    this.connexionService.deconnexion();
  }

  updateSearchMaterial() {
    if (this.search !== '') {
      const searchLowerCase = this.search.toLowerCase();

      const filteredMaterials = this.materialsList.filter((material) => {
        return (
          (material.id?.toString().toLowerCase().includes(searchLowerCase) ?? false) ||
          (material.wording?.toLowerCase().includes(searchLowerCase) ?? false) 
        );
      });

      this.materialsList = filteredMaterials;
    } else {
      // Si le champ de recherche est vide, réinitialiser le tableau avec les données d'origine
      this.raffraichir();
    }
  }

  resetSearch() {
    this.search = ''; // Réinitialise la valeur de la recherche à une chaîne vide
    this.updateSearchMaterial(); // Mets à jour les résultats de recherche pour afficher toutes les données d'origine
  }

  onDeleteMaterial(idMaterial: number | undefined) {
    if (idMaterial != undefined) {
      this.materialService
        .deleteMaterial(idMaterial)
        .subscribe(
          (material) => {
            this.raffraichir();
          },
          (error) => {
            alert("Impossible de supprimer le matériel. Veuillez vérifier les contraintes de location.");
          }
        );
    }
  }
}
