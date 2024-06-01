import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
  it("should create default product", () => {
    const product = ProductFactory.create("Product 1", 150, "default");

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(150);
    expect(product.constructor.name).toBe("Product");
  });
  
  it("should create default product by default", () => {
    const product = ProductFactory.create("Product 2", 143);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 2");
    expect(product.price).toBe(143);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create double product", () => {
    const product = ProductFactory.create("Product 3", 150, "double");

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 3");
    expect(product.price).toBe(300);
    expect(product.constructor.name).toBe("ProductDouble");
  });

  it("should throw an error when product type is invalid", () => {
    expect(() => ProductFactory.create("Product 5", 60, "invalid")).toThrowError("Invalid product type");
  });
});
