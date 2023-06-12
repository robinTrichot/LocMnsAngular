import { Component } from '@angular/core';

import { Usager } from 'src/models/usager';
import { UsagerServiceService } from 'src/app/services/usager-service.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-edition-utilisateur',
  templateUrl: './edition-utilisateur.component.html',
  styleUrls: ['./edition-utilisateur.component.scss']
})
export class EditionUtilisateurComponent {

  utilisateurConnecte: Usager | null = null;
  usersList: Usager[] = [];

  displayedColumns: string[] = ['id', 'login', 'nomImageProfil', 'lastname',
    'firstname', 'phone', 'cellPhone', 'mail', 'streetNumber', 'nameStreet', 'postalCode', 'city', 'role', 'Edit'];

  isAdmin: boolean = false;
  search: string = '';

  constructor(
    private usagerService: UsagerServiceService,
    private connexionService: ConnexionService,
    private imageCompress: NgxImageCompressService,
  ) { }

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (
        this.isAdmin = utilisateur?.role.role == "ROLE_ADMIN"));

    this.usagerService._utilisateurs.subscribe(
      (utilisateurs) => (this.usersList = utilisateurs));

    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));

    this.raffraichir();

  }

  raffraichir(): void {
    this.usagerService.getUtilisateurs();
  }

  onDeconnexion() {
    this.connexionService.deconnexion();
  }



  onDeleteUser(idUtilisateur: number | undefined) {
    if (idUtilisateur != undefined) {
      this.usagerService
        .deleteUtilisateur(idUtilisateur)
        .subscribe(
          (utilisateur) => {
            this.raffraichir();
          },
          (error) => {
            alert("Impossible de supprimer l'utilisateur. Veuillez vérifier les contraintes de location.");
          }
        );
    }
  }

  updateSearchResults() {
    if (this.search !== '') {
      const searchLowerCase = this.search.toLowerCase();

      const filteredUsers = this.usersList.filter((utilisateur) => {
        return (
          (utilisateur.id?.toString().toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.login?.toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.lastname?.toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.firstname?.toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.phone?.toString().toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.cellPhone?.toString().toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.mail?.toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.streetNumber?.toString().toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.nameStreet?.toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.postalCode?.toString().toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.city?.toLowerCase().includes(searchLowerCase) ?? false) ||
          (utilisateur.role?.role.toLowerCase().includes(searchLowerCase) ?? false)
        );
      });

      this.usersList = filteredUsers;
    } else {
      // Si le champ de recherche est vide, réinitialiser le tableau avec les données d'origine
      this.raffraichir();
    }
  }

  resetSearch() {
    this.search = ''; // Réinitialise la valeur de la recherche à une chaîne vide
    this.updateSearchResults(); // Met à jour les résultats de recherche pour afficher toutes les données d'origine
  }

}