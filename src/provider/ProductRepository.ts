import { Products } from "../model";

export interface ProductRepository {
    save(product: Products): Promise<Products>;
    getAll(): Promise<Products[]>;
    findById(id: string): Promise<Products | null>;
}