import { CreateProductDTO, Products } from "../model";
import { ProductRepository } from "../provider";
import { AppError } from "../shared/errors/AppError";

export class ProductsService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(dto: CreateProductDTO): Promise<Products> {
    const product = Products.create(dto);
    if (!product) throw new AppError("Dados Inválidos", 400);

    await this.productRepo.save(product);
    return product;
  }

  async getAllProducts(): Promise<Products[]> {
    return await this.productRepo.getAll();
  }

  async getProductById(id: string): Promise<Products | null> {
    const product = await this.productRepo.findById(id);
    if (!product) return null;
    
    return product;
  }
}
