import { Products as PrismaProducts } from "../../generated/prisma/client";
import { Products } from "../model";

export class ProductMapper{
    static toDomain(prismaProduct: PrismaProducts): Products {
        return Products.restore(prismaProduct.id, {
            name: prismaProduct.name,
            price: prismaProduct.price,
            stock: prismaProduct.stock,
            createdAt: prismaProduct.createdAt,
        });
    }

    static toPrisma(product: Products): PrismaProducts {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt,
        };
    }

    static toView(product: Products) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            createdAt: product.createdAt
        };
    }
}