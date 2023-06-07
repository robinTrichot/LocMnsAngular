import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { Page404Component } from './pages/page404/page404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';
import { MatTableModule } from '@angular/material/table';
import { ModifAjoutUtilisateurComponent } from './pages/modif-ajout-utilisateur/modif-ajout-utilisateur.component';
import { MatSelectModule } from '@angular/material/select';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { FooterComponent } from './pages/footer/footer.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { EmprunterComponent } from './pages/emprunter/emprunter.component';
import { MesReservationsComponent } from './pages/mes-reservations/mes-reservations.component';
import { PanneComponent } from './pages/panne/panne.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from './pipes/date.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatRadioModule } from '@angular/material/radio';
import { GestionLocationsComponent } from './pages/gestion-locations/gestion-locations.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    Page404Component,
    InscriptionComponent,
    EditionUtilisateurComponent,
    ModifAjoutUtilisateurComponent,
    FooterComponent,
    AccueilComponent,
    EmprunterComponent,
    MesReservationsComponent,
    PanneComponent,
    AdministrationComponent,
    DatePipe,
    GestionLocationsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FormsModule,
    MatNativeDateModule,
    MatRadioModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],

  bootstrap: [AppComponent]
})
export class AppModule { }
