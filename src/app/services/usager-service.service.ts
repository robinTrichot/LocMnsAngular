import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usager } from 'src/models/usager';
import { ImageService } from './image.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsagerServiceService {

  public _utilisateurs: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient,
    private imageService: ImageService,
  ) { }

  public getUtilisateurs() {
    // pourquoi on fait ça ? pour pouvoir utilisateur une fonction qu on va rappeler plusieurs fois dans differents comoponents; 
    this.http
      .get<Usager[]>(environment.serverUrl + '/user/usagers')
      .subscribe((utilisateurs: Usager[]) => {
        // pour chacun des uitliserus on va parcouris leurs images
        // c'est de l'optimisation ici en fait hein 

        for (let utilisateur of utilisateurs) {
          this.imageService.chargementImageProfil(utilisateur)
        }

        this._utilisateurs.next(utilisateurs);
      });
  }

  // permet de supprimer un utilisateur défini grâce à son "id"
  public deleteUtilisateur(id: number): Observable<any> {
    return this.http.delete(environment.serverUrl + '/admin/deleteUsager/' + id);
  }

  // donc ici c'est plus un utilisateur mais un formadata; 
  public editionUtilisateur(formData: FormData): Observable<any> {
    return this.http.post(environment.serverUrl + '/admin/addUsager', formData);
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + '/user/usager/' + id);
  }
}