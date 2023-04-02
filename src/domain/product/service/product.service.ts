import type Product from "../entity/product";

export default class ProductService {
  static increasePriceAll(products: Product[], percentage: number): void {
    products.forEach(product => {
      const newprice = product.price + (percentage / 100 * product.price);
      product.changePrice(newprice);
    });
  }
}
