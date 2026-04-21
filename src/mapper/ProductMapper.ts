import { Products as PrismaProducts } from "../../generated/prisma/client";
import { Products } from "../model";

export class ProductMapper{
    static toDomain(rawProduct: PrismaProducts): Products {
        return Products.restore(rawProduct.id, {
            name: rawProduct.name,
            price: rawProduct.price,
            stock: rawProduct.stock,
            createdAt: rawProduct.createdAt,
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