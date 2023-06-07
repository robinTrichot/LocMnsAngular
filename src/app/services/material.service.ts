import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Material } from 'src/models/material';
import { ImageService } from './image.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  public _material: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient,
    private imageService: ImageService) { }


  public getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>("http://localhost:8080/materials")
  }






  // en dessous : pour thibaut : 

  // modif pour picture
  // public getMaterials() {
  //   this.http
  //     .get<Material[]>('http://localhost:8080/materials')
  //     .subscribe((materials: Material[]) => {
  //       for (let material of materials) {
  //         this.imageService.chargementPicture(material)
  //       }
  //       this._material.next(materials);
  //     });
  // }

  // public getMaterials(): Observable<Material[]> {
  //   return this.http.get<Material[]>('http://localhost:8080/materials').pipe(
  //     tap((materials: Material[]) => {
  //       // pipe() : effectuer des opérations supplémentaires sur l'observable émis par la requête HTTP
  //       // tap() : utilisé dans le pipe pour effectuer une action sur chaque élément émis par l'observable 
  //       //avant de les transmettre au composant consommateur (itération sur material et appelle pour charger l'image)
  //       for (let material of materials) {
  //         this.imageService.chargementImageProfil(material);
  //       }
  //     })
  //   );
  // }

  // public editionMaterial(formData: FormData): Observable<any> {
  //   return this.http.post('http://localhost:8080/admin/addMaterial', formData);
  // }

  // public getMaterial(id: number): Observable<any> {
  //   return this.http.get('http://localhost:8080/materialById/' + id);
  // }

  // public deleteMaterial(id: number): Observable<any> {
  //   return this.http.delete('http://localhost:8080/admin/deleteMaterial/' + id);
  // }

}
