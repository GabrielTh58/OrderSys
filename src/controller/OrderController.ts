import { Request, Response } from "express";
import { OrderService } from "../service/OrderService";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    const order = await this.orderService.createOrder(req.body);
    res.status(201).json(order);
  }

  async getOrderById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const order = await this.orderService.getOrderById(String(id));
    res.status(200).json(order);
  }

  async getAllOrders(req: Request, res: Response): Promise<void> {
    const orders = await this.orderService.getAllOrders();
    res.status(200).json(orders);
  }
}
