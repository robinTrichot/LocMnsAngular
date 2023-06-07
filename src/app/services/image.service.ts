import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Usager } from 'src/models/usager';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  // sanitizerr ça permet de nnettoyer l'url, de laisser les caracteres spéciaux, mais ne pas afficher par exemple des scripts etc...
  // c'est plus propore viseullement quoi 

  chargementImageProfil(utilisateur: Usager) {

    // Vérifier si l'utilisateur a une image de profil, si pas d'image, on ne fait pas cette requête
    if (utilisateur.nomImageProfil != null) {
      // Charger l'image de profil à partir du serveur
      this.http
        .get('http://localhost:8080/image-profil/' + utilisateur.id, { responseType: 'blob' })
        .subscribe((donneeImage: any) => {
          // Sanitiser l'URL de l'image pour des raisons de sécurité
          utilisateur.imageProfil = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(donneeImage)
          );
        });
    }
  }




  // pour thibaut (back material):


//   chargementPicture(material: Material) {
//     if (material.pictureName != null) {
//       this.http
//         .get('http://localhost:8080/picture-material/' + material.id, { responseType: 'blob' })
//         .subscribe((donneePicture: any) => {
//           material.picture = this.sanitizer.bypassSecurityTrustUrl(
//             URL.createObjectURL(donneePicture)
//           );
//         });
//     }
//   }
// }

}
