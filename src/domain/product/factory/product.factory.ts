import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";
import ProductDouble from "../entity/productDouble";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
  static create(name: string, price: number, productType = "default"): ProductInterface {
    switch (productType) {
      case "default":
        return new Product(uuid(), name, price);
      case "double":
        return new ProductDouble(uuid(), name, price);
      default:
        throw new Error("Invalid product type");
    }
  }
}
