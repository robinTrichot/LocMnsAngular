import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Material } from 'src/models/material';
import { ImageService } from './image.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  public _materials: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private imageService: ImageService) {}

  public getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(environment.serverUrl + '/user/materials');
  }

  public getMaterialsWithPicture() {
    this.http
      .get<Material[]>(environment.serverUrl + '/user/materials')
      .subscribe((materials: Material[]) => {
        for (let material of materials) {
          this.imageService.chargementPicture(material);
        }
        this._materials.next(materials);
      });
  }

  public editionMaterial(formData: FormData): Observable<any> {
    return this.http.post(
      environment.serverUrl + '/admin/addMaterial',
      formData
    );
  }

  public getMaterial(id: number): Observable<any> {
    return this.http.get(environment.serverUrl + '/user/materialById/' + id);
  }

  public deleteMaterial(id: number): Observable<any> {
    return this.http.delete(
      environment.serverUrl + '/admin/deleteMaterial/' + id
    );
  }
}
