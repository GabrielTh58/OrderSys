import { Request, Response } from "express";
import { ProductsService } from "../service/ProductsService";
import { ProductMapper } from "../mapper/ProductMapper";

export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}

    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, price, stock } = req.body;

        const product = await this.productsService.createProduct({ name, price, stock });

        res.status(201).json(ProductMapper.toView(product));
    }

    async getAllProducts(req: Request, res: Response): Promise<void> {
        const products = await this.productsService.getAllProducts();
        const productsView = products.map(ProductMapper.toView);

        res.status(200).json(productsView);    
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const product = await this.productsService.getProductById(String(id));

        if (!product) {
            res.status(404).json({ message: "Produto não encontrado" });
            return;
        }

        res.status(200).json(ProductMapper.toView(product));
    }
}