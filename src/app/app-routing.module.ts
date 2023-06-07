import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AdminGuard } from './guards/admin-guard.guard';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';
import { ModifAjoutUtilisateurComponent } from './pages/modif-ajout-utilisateur/modif-ajout-utilisateur.component';
import { Page404Component } from './pages/page404/page404.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { EmprunterComponent } from './pages/emprunter/emprunter.component';
import { MesReservationsComponent } from './pages/mes-reservations/mes-reservations.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { GestionLocationsComponent } from './pages/gestion-locations/gestion-locations.component';

const routes: Routes = [

  { path: "connexion", component: ConnexionComponent },
  {
    path: "accueil", component: AccueilComponent,
    children: [
      { path: "emprunter", component: EmprunterComponent },
      { path: "mes-reservations", component: MesReservationsComponent },],
  },
  {
    path: "administration", component: AdministrationComponent, canActivate: [AdminGuard],
    children: [
      { path: "edition-utilisateur", component: EditionUtilisateurComponent, canActivate: [AdminGuard] },
      { path: "modif-ajout-utilisateur", component: ModifAjoutUtilisateurComponent, canActivate: [AdminGuard] },
      { path: "modif-ajout-utilisateur/:id", component: ModifAjoutUtilisateurComponent, canActivate: [AdminGuard] },
      { path: "gestion-locations", component: GestionLocationsComponent, canActivate: [AdminGuard] },
      { path: "gestion-locations/:id", component: GestionLocationsComponent, canActivate: [AdminGuard] },
    ],
  },
  { path: "", redirectTo: "connexion", pathMatch: "full" },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }