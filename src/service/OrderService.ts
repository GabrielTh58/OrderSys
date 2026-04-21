import { CreateOrderDTO, Order } from "../model";
import { OrderRepository, ProductsRepository } from "../provider";
import { AppError } from "../shared/errors/AppError";

export class OrderService {
    constructor(
        private readonly orderRepo: OrderRepository,
        private readonly productRepo: ProductsRepository
    ) {}

    async createOrder(dto: CreateOrderDTO): Promise<Order> {
        if(dto.orderItems.some(item => item.quantity <= 0)) throw new AppError("Quantity must be greater than zero", 400);

        const findById = (id: string) => this.productRepo.findById(id);
        
        const products = await Promise.all(dto.orderItems.map((item) => findById(item.productId)));
        if(products.some(product => product === null)) throw new AppError("One or more products not found", 404);

        products.forEach((product, i) => {
            if(product!.stock < dto.orderItems[i].quantity) throw new AppError(`Insufficient stock of ${product!.name}`, 400);
        })

        const updatedProducts = products.map((product, i) =>
            product!.decreaseStock(dto.orderItems[i].quantity)
        );

        const order = Order.create(dto);

        
        const [orderCreated, _] = await Promise.all([    
            this.orderRepo.save(order),
            updatedProducts.map(product => this.productRepo.save(product!))
        ]);

        return orderCreated;
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.orderRepo.findById(id);
        if (!order) throw new AppError("Order not found", 404);
        return order;
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderRepo.getAllOrders();
    }
}