import { Features } from "./features";
import { Material } from "./material";


export interface Copy {
    id: number;
    datePurchase: Date;
    status: string;
    inStock?: boolean;
    dateOutOfStock?: Date;
    serialNumber: string;
    material: Material;
    features: Features
}



