import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';
import { RoleService } from 'src/app/services/role.service';
import { UsagerServiceService } from 'src/app/services/usager-service.service';
import { TypeUsager } from 'src/models/typeUsager';
import { Usager } from 'src/models/usager';

@Component({
  selector: 'app-modif-ajout-utilisateur',
  templateUrl: './modif-ajout-utilisateur.component.html',
  styleUrls: ['./modif-ajout-utilisateur.component.scss'],
})
export class ModifAjoutUtilisateurComponent {
  isAdmin: boolean = false;
  utilisateurConnecte: Usager | null = null;

  idUtilisateur?: number;
  codeRetour: number = 0;
  messageErreur: string = '';
  fichier: File | null = null;
  listeRole: TypeUsager[] = [];

  tookEmailYet : boolean = false;

  formulaire: FormGroup = this.formBuilder.group({
    mail: ['', [Validators.email, Validators.required]],
    password: [''], // j'utilise un valdiator dynamique
    lastname: [
      '',
      [Validators.required, Validators.minLength(3), this.noIntegerValidator],
    ],
    firstname: [
      '',
      [Validators.required, Validators.minLength(3), this.noIntegerValidator],
    ],
    phone: ['', [Validators.required, this.integerValidator]],
    cellPhone: ['', [Validators.required, this.integerValidator]],
    streetNumber: ['', [Validators.required, this.integerValidator]],
    nameStreet: ['', [Validators.required, this.noIntegerValidator]],
    postalCode: ['', [Validators.required]],
    city: ['', [Validators.required, this.noIntegerValidator]],
    role: [null, [Validators.required]],
  });

  constructor(
    private usagerService: UsagerServiceService,
    private connexionService: ConnexionService,
    private serviceUtilisateur: UsagerServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceRole: RoleService
  ) {}

  ngOnInit() {
    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur)
    );

    this.configurePasswordValidator();

    this.raffraichir();

    this.serviceRole.getRoles().subscribe({
      next: (listeRole) => (this.listeRole = listeRole),
      error: (erreur) => console.log(erreur),
    });

    this.route.params.subscribe((parametres) => {
      this.idUtilisateur = parametres['id'];

      if (this.idUtilisateur != null) {
        this.serviceUtilisateur.getUtilisateur(this.idUtilisateur).subscribe({
          next: (utilisateur: Usager) => {
            this.formulaire.get('mail')?.setValue(utilisateur.mail); // le "?" ne pas oublier que ça renvoit soit un un truc soit un null, au cas c'est null on lui dit faire un truc en fait
            this.formulaire.get('password')?.setValue(utilisateur.password);
            this.formulaire.get('lastname')?.setValue(utilisateur.lastname);
            this.formulaire.get('firstname')?.setValue(utilisateur.firstname);
            this.formulaire.get('phone')?.setValue(utilisateur.phone);
            this.formulaire.get('cellPhone')?.setValue(utilisateur.cellPhone);
            this.formulaire
              .get('streetNumber')
              ?.setValue(utilisateur.streetNumber);
            this.formulaire.get('nameStreet')?.setValue(utilisateur.nameStreet);
            this.formulaire.get('postalCode')?.setValue(utilisateur.postalCode);
            this.formulaire.get('city')?.setValue(utilisateur.city);
            this.formulaire.get('role')?.setValue(utilisateur.role);
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
    this.usagerService.getUtilisateurs();
  }

  onDeconnexion() {
    this.connexionService.deconnexion();
  }

  onSubmit() {
    this.configurePasswordValidator();

    if (this.formulaire.valid) {
      const formData = new FormData();
      const utilisateur: Usager = this.formulaire.value;
      utilisateur.id = this.idUtilisateur;

      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      formData.append(
        'usager',
        new Blob([JSON.stringify(utilisateur)], {
          type: 'application/json',
        })
      );

      if (this.idUtilisateur) {
        this.serviceUtilisateur
          .editionUtilisateurModif(formData) // Je modifie l'utilisateur
          .subscribe(
            (resultat) => {
              this.router.navigateByUrl('/administration/edition-utilisateur');
            },
            (error) => {
              if (error.status === 409) {
                this.tookEmailYet = true;
                console.error(
                  "Cet utilisateur existe déjà, l'email est déjà pris"
                );
              } else {
                // Gérer les autres erreurs ici
                console.error("Une erreur s'est produite :", error);
              }
            }
          );
      } else {
        this.serviceUtilisateur
          .editionUtilisateur(formData) // J'ajoute l'utilisateur.
          .subscribe(
            (resultat) => {
              this.router.navigateByUrl('/administration/edition-utilisateur');
            },
            (error) => {
              if (error.status === 409) {
                 this.tookEmailYet = true;
                console.error(
                  "Cet utilisateur existe déjà, l'email est déjà pris"
                );
              } else {
                // Gérer les autres erreurs ici
                console.error("Une erreur s'est produite :", error);
              }
            }
          );
      }
    }
  }
  //methode assez complexe
  // pour faire en sorte que si l'utilisateur existe et que je veux le modifier le validtor password nexite pas
  // en revanche je veux un validator si l'utilisateur doit être crée.
  private configurePasswordValidator(): void {
    const passwordControl = this.formulaire.get('password');

    if (this.idUtilisateur) {
      // Si idUtilisateur n'est pas null, supprimez le validateur de mot de passe
      passwordControl?.clearValidators();
    } else {
      // Si idUtilisateur est null, ajoutez le validateur de mot de passe
      passwordControl?.setValidators([Validators.required]);
    }
    passwordControl?.updateValueAndValidity();
  }

  onImageSelectionnee(event: any) {
    this.fichier = event.target.files[0];
  }

  compareRole(roleOption: any, roleUtilisateur: any) {
    return (
      roleUtilisateur != null && roleUtilisateur.id == roleOption.id // il faut toujours faire cette forme là avec le compareWtith
    ); // voici la comparaison entre les Role
    // donc on vient vérifier déjà sil est null et ensuite on fait la vérififcation si ça match;
  }

  integerValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const isInteger = /^-?\d+$/.test(value.toString());
    return isInteger ? null : { integer: true };
  }

  noIntegerValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null; // retourner null si la valeur est vide
    }
    const containsInteger = /[0-9]/.test(value.toString());
    return containsInteger ? { noInteger: true } : null; // retourner une erreur si la valeur contient un entier
  }
}
