import { Entity, EntityProps, Id } from "../../shared";
import { Validator } from "../../utils";

interface ProductProps extends EntityProps {
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  stock: number;
}

export class Products extends Entity<ProductProps> {
  constructor(id: string, props: ProductProps) {
    super(id, props);
  }

  static create(dto: CreateProductDTO): Products {
    const id = Id.generate();

    const validation = Validator.combine(
      Validator.notNullOrEmpty("NAME_IS_REQUIRED", dto.name),
      Validator.isPositiveNumber("PRICE_MUST_BE_POSITIVE", dto.price),
      Validator.isNonNegativeNumber("STOCK_CANNOT_BE_NEGATIVE", dto.stock),
    );

    if (validation) {
      throw new Error(validation);
    }

    return new Products(id, {
        name: dto.name,
        price: dto.price,
        stock: dto.stock,
        createdAt: new Date(),
    });
  }

  decreaseStock(quantity: number): Products {
    return this.clone({ stock: this.stock - quantity });
  }

  static restore(id: string, props: ProductProps): Products {
    return new Products(id, props);
  }

  private clone(changes: Partial<ProductProps>): Products {
    return new Products(this.id, {
      ...this.props,
      ...changes
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt,
    };
  }

  get name(): string { return this.props.name; }
  get price(): number { return this.props.price; }
  get stock(): number { return this.props.stock; }
  get createdAt(): Date { return this.props.createdAt; }
}
