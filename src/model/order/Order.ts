import { Entity, EntityProps } from "../../shared";

export interface Items {
    id: string;
    productId: string;
    orderid: string;
    quantity: number;
    price: number;
}

export interface OrderProps extends EntityProps {
    total: number;  
    userId: string;
    itemIds: Items[];
    createdAt: Date;
}

export class Order extends Entity<OrderProps> {
    constructor(id: string, props: OrderProps){
        super(id, props);
    }
}