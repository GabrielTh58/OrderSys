import { Order as OrderPrisma, Prisma} from "../../generated/prisma/client";
import { Order } from "../model";

type OrderWithItems = Prisma.OrderGetPayload<{
    include: { orderItems: true }  
}>;

export class OrderMapper {
    static toDomain(rawOrder: OrderWithItems): Order {
        return Order.restore(rawOrder.id, {
            total: rawOrder.total,
            userId: rawOrder.userId,
            createdAt: rawOrder.createdAt,
            OrderItems: rawOrder.orderItems.map(item => ({
                id: item.id,
                productId: item.productId,
                orderId: item.orderId,
                quantity: item.quantity,
                price: item.price
            }))
        });
    }

static toPrisma(order: Order): Prisma.OrderCreateInput {
    return {
        id: order.id,
        total: order.total,
        user: { connect: { id: order.userId } }, 
        createdAt: order.createdAt,
        orderItems: {
            create: order.orderItems.map(item => ({
                id: item.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))
        }
    };
}
}