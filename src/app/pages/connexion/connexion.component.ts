
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {


  formulaire: FormGroup = this.formBuilder.group({
    mail: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });

  erreurLogin = false;


  constructor(private formBuilder: FormBuilder,
    private connexionService: ConnexionService,
    private router: Router) { }



  onSubmit(): void {
    if (this.formulaire.valid) {
      this.connexionService.connexion(this.formulaire.value)
        .subscribe({
          next: (jwt) => {
            localStorage.setItem("jwt", jwt);
            this.connexionService.updateUserConnecte();
            this.router.navigateByUrl('/accueil');
          },
          error: (erreur) => {
            this.erreurLogin = true;
          }
        });
    }
  }
}
