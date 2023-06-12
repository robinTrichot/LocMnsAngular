import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Material } from 'src/models/material';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  public _materials: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient,
    private imageService: ImageService) { }


  public getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>("http://localhost:8080/user/materials")
  }


  public getMaterialsWithPicture() {
    this.http
      .get<Material[]>('http://localhost:8080/user/materials')
      .subscribe((materials: Material[]) => {
        for (let material of materials) {
          this.imageService.chargementPicture(material)
        }
        this._materials.next(materials);
      });
  }


  public editionMaterial(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/admin/addMaterial', formData);
  }

  public getMaterial(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/user/materialById/' + id);
  }

  public deleteMaterial(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/admin/deleteMaterial/' + id);
  }

}
