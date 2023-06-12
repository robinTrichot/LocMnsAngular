import { Features } from "./features";

export interface Material {
    id?: number;
    wording?: string;
    picture?: any;
    pictureName?: string;
    notice?: string;
    features?: Features;
    trademarkMaterial?: string;
    structure?: string;
    copies: string;
    createdAt?: Date;
    updatedAt?: Date;
}
