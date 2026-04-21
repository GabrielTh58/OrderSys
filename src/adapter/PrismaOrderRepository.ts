import { PrismaClient } from "../../generated/prisma/client";
import { OrderMapper } from "../mapper/OrderMapper";
import { Order } from "../model";
import { OrderRepository } from "../provider";

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(order: Order): Promise<Order> {
    const data = OrderMapper.toPrisma(order);

    const savedOrder = await this.prisma.order.upsert({
      where: { id: order.id },
      update: {
        total: data.total,
        user: data.user,
      },
      create: data,
      include: { orderItems: true }, 
    });

    return OrderMapper.toDomain(savedOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const data = await this.prisma.order.findUnique({
        where: { id },
        include: { orderItems: true }
    });
    return data ? OrderMapper.toDomain(data) : null;
  }

  async getAllOrders(): Promise<Order[]> {
    const data = await this.prisma.order.findMany({
        include: { orderItems: true }
    });
    return data.map(OrderMapper.toDomain);
  }
}
