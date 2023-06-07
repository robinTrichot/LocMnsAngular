import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';
import { RoleService } from 'src/app/services/role.service';
import { UsagerServiceService } from 'src/app/services/usager-service.service';
import { TypeUsager } from 'src/models/typeUsager';
import { Usager } from 'src/models/usager';


@Component({
  selector: 'app-modif-ajout-utilisateur',
  templateUrl: './modif-ajout-utilisateur.component.html',
  styleUrls: ['./modif-ajout-utilisateur.component.scss']
})
export class ModifAjoutUtilisateurComponent {

  isAdmin: boolean = false;
  utilisateurConnecte: Usager | null = null;

  idUtilisateur?: number;
  codeRetour: number = 0;
  messageErreur: string = '';
  fichier: File | null = null;
  listeRole: TypeUsager[] = [];

  formulaire: FormGroup = this.formBuilder.group({
    mail: ['', [Validators.email, Validators.required]],
    login: ['', [Validators.required, Validators.minLength(3)]],
 //   password: ['', [Validators.required]],
    lastname: ['', [Validators.required, Validators.minLength(3), this.noIntegerValidator]],
    firstname: ['', [Validators.required, Validators.minLength(3), this.noIntegerValidator]],
    phone: ['', [Validators.required, this.integerValidator]],
    cellPhone: ['', [Validators.required, this.integerValidator]],
    streetNumber: ['', [Validators.required, this.integerValidator]],
    nameStreet: ['', [Validators.required, this.noIntegerValidator]],
    postalCode: ['', [Validators.required]],
    city: ['', [Validators.required, this.noIntegerValidator]],
    role: [null, [Validators.required]]
  });


  constructor(
    private usagerService: UsagerServiceService,
    private connexionService: ConnexionService,
    private serviceUtilisateur: UsagerServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceRole: RoleService
  ) { }

  ngOnInit() {

    this.connexionService._utilisateurConnecte.subscribe(
      (utilisateur) => (this.utilisateurConnecte = utilisateur));

    this.raffraichir();

    this.serviceRole.getRoles().subscribe({
      next: listeRole => this.listeRole = listeRole,
      error: erreur => console.log(erreur)
    });

    this.route.params.subscribe((parametres) => {
      this.idUtilisateur = parametres['id'];

      if (this.idUtilisateur != null) {
        this.serviceUtilisateur.getUtilisateur(this.idUtilisateur).subscribe({
          next: (utilisateur: Usager) => {
            this.formulaire.get('mail')?.setValue(utilisateur.mail); // le "?" ne pas oublier que ça renvoit soit un un truc soit un null, au cas c'est null on lui dit faire un truc en fait
            this.formulaire.get('login')?.setValue(utilisateur.login);
         //   this.formulaire.get('password')?.setValue(utilisateur.password);
            this.formulaire.get('lastname')?.setValue(utilisateur.lastname);
            this.formulaire.get('firstname')?.setValue(utilisateur.firstname);
            this.formulaire.get('phone')?.setValue(utilisateur.phone);
            this.formulaire.get('cellPhone')?.setValue(utilisateur.cellPhone);
            this.formulaire.get('streetNumber')?.setValue(utilisateur.streetNumber);
            this.formulaire.get('nameStreet')?.setValue(utilisateur.nameStreet);
            this.formulaire.get('postalCode')?.setValue(utilisateur.postalCode);
            this.formulaire.get('city')?.setValue(utilisateur.city);
            this.formulaire.get('role')?.setValue(utilisateur.role)
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
    if (this.formulaire.valid) {

      //tout ceci permet de prendre et transformer le fichier donné par l'utilisateur; 
      const formData = new FormData();

      const utilisateur: Usager = this.formulaire.value; // donc on recupere le formulaire ici
      utilisateur.id = this.idUtilisateur; // + un id; 

      if (this.fichier) {
        formData.append('fichier', this.fichier);
      }

      formData.append(
        'usager',
        new Blob([JSON.stringify(utilisateur)], {
          type: 'application/json',
        })
      );

      this.serviceUtilisateur
        .editionUtilisateur(formData) // ici on passe plutôt le formadata, ce n'est plus un body raw mais un body formdata qu'on envoit
        .subscribe((resultat) => this.router.navigateByUrl('/administration/edition-utilisateur'));
    }
  }

  onImageSelectionnee(event: any) {
    this.fichier = event.target.files[0];
  }

  compareRole(roleOption: any, roleUtilisateur: any) {
    return (roleUtilisateur != null && roleUtilisateur.id == roleOption.id // il faut toujours faire cette forme là avec le compareWtith
    )  // voici la comparaison entre les Role 
    // donc on vient vérifier déjà sil est null et ensuite on fait la vérififcation si ça match; 
  }


  integerValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const isInteger = /^-?\d+$/.test(value.toString());
    return isInteger ? null : { 'integer': true };
  }

  noIntegerValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null; // retourner null si la valeur est vide
    }
    const containsInteger = /[0-9]/.test(value.toString());
    return containsInteger ? { 'noInteger': true } : null; // retourner une erreur si la valeur contient un entier
  }

}