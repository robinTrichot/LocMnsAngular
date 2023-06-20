import { Structure } from "./structure";
import { TypeUsager } from "./typeUsager";


export interface Usager {
    id?: number; // le ? rappel : c'est un number ou un undefined, 
    password?: string;
    lastname?: string;
    firstname?: string;
    phone?: number;
    cellPhone?: number;
    mail: string;
    streetNumber?: number;
    nameStreet?: string;
    postalCode?: string,
    city?: string;
    role: TypeUsager;
    structure? : Structure[];

    createdAt?: Date;
    updatedAt?: Date;

    // donc on voit on recueprer le nomImageProfil (limage quo iet on vient la stocker dans imageProfil)
    nomImageProfil?: string;
    imageProfil?: any;
}