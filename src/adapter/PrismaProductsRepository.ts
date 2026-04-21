import { PrismaClient } from "../../generated/prisma/client";
import { ProductMapper } from "../mapper/ProductMapper";
import { Products } from "../model";
import { ProductsRepository } from "../provider";

export class PrismaProductsRepository implements ProductsRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    async save(product: Products): Promise<Products> {
        const rawProduct = ProductMapper.toPrisma(product);

        const { id, createdAt, ...rest } = rawProduct;

        const savedProduct = await this.prisma.products.upsert({
            where: { id: rawProduct.id },
            update: rest,
            create: rawProduct
        });

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