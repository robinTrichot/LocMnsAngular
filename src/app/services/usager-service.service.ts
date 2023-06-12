import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usager } from 'src/models/usager';
import { ImageService } from './image.service';
import { NgxImageCompressService } from 'ngx-image-compress';

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
      .get<Usager[]>('http://localhost:8080/user/usagers')
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
    return this.http.delete('http://localhost:8080/admin/deleteUsager/' + id);
  }

  // donc ici c'est plus un utilisateur mais un formadata; 
  public editionUtilisateur(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/admin/addUsager', formData);
  }

  public getUtilisateur(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/user/usager/' + id);
  }
}