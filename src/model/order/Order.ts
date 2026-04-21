import { Entity, EntityProps, Id } from "../../shared";

export interface OrderItems {
    id: string;
    productId: string;
    orderId: string;
    quantity: number;
    price: number;
}

export interface OrderProps extends EntityProps {
    total: number;  
    userId: string;
    OrderItems: OrderItems[];
    createdAt: Date;
}

export interface CreateOrderDTO {
    userId: string;
    orderItems: {
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export class Order extends Entity<OrderProps> {
    constructor(id: string, props: OrderProps){
        super(id, props);
    }

    static create(dto: CreateOrderDTO): Order {
        const id = Id.generate();

        const total = dto.orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

        const processedOrderItems: OrderItems[] = dto.orderItems.map(item => ({
            id: Id.generate(),
            productId: item.productId,
            orderId: id,
            quantity: item.quantity,
            price: item.price
        }));

        return new Order(id, {
            total,
            userId: dto.userId,
            OrderItems: processedOrderItems,
            createdAt: new Date()
        });
    }

    static restore(id: string, props: OrderProps): Order {
        return new Order(id, props);
    }

    get total(): number { return this.props.total }
    get userId(): string { return this.props.userId }
    get orderItems(): OrderItems[] { return this.props.OrderItems }
    get createdAt(): Date { return this.props.createdAt }
}