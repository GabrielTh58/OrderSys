import { PrismaClient } from "../../generated/prisma/client";
import { ProductMapper } from "../mapper/ProductMapper";
import { Products } from "../model";
import { ProductRepository } from "../provider";

export class ProductsRepository implements ProductRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(product: Products): Promise<Products> {
        const prismaProduct = ProductMapper.toPrisma(product);

        const savedProduct = await this.prisma.products.create({ data: prismaProduct });

        return ProductMapper.toDomain(savedProduct);
    }

    async getAll(): Promise<Products[]> {
        const data = await this.prisma.products.findMany();
        return data.map(ProductMapper.toDomain);
    }

    async findById(id: string): Promise<Products | null> {
        const prismaProduct = await this.prisma.products.findUnique({
            where: { id }
        });
        
        return prismaProduct ? ProductMapper.toDomain(prismaProduct) : null;
    }
}