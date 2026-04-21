import { Router } from "express";
import { OrderService } from "../service/OrderService";
import { prisma } from "../db/Prisma";
import { PrismaProductsRepository } from "../adapter/PrismaProductsRepository";
import { OrderController } from "../controller/OrderController";
import { PrismaOrderRepository } from "../adapter/PrismaOrderRepository";

const router = Router();

const orderRepository = new PrismaOrderRepository(prisma);
const productRepository = new PrismaProductsRepository(prisma);

const orderService = new OrderService(orderRepository, productRepository);
const orderController = new OrderController(orderService);

router.post("/", (req, res) => {
    orderController.createOrder(req, res);
});


router.get("/", (req, res) => {
    orderController.getAllOrders(req, res);
});

router.get("/:id", (req, res) => {
    orderController.getOrderById(req, res);
});

export default router;