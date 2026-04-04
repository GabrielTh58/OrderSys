import { Entity, EntityProps } from "../../shared";

interface ProductProps extends EntityProps {
    name: string;
    price: number;
    stock: number;
    createdAt: Date;
}

export class Products extends Entity<ProductProps>{    

    constructor(id: string,props: ProductProps){
        super(id, props);
    }
}