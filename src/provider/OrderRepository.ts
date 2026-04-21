import { Order } from "../model";

export interface OrderRepository { 
    save(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    getAllOrders(): Promise<Order[]>;
}