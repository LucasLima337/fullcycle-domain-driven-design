import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 150);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "product 1",
      price: 150,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 150);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "product 1",
      price: 150,
    });

    product.changeName("product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const updatedProductModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(updatedProductModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "product 1", 150);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    
    const foundProduct = await productRepository.find("1");

    expect(productModel?.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "product 1", 150);
    const product2 = new Product("2", "product 2", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toStrictEqual(foundProducts);
  });
});
