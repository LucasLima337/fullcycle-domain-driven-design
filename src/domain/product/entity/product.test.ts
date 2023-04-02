import Product from "./product";

describe("Product unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Product("", "Product 1", 150)).toThrowError("Id is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new Product("123", "", 150)).toThrowError("Name is required");
  });

  it("should throw an error when price is zero or less than zero", () => {
    expect(() => new Product("123", "Product 2", -5)).toThrowError("Price must be greater than zero");
    expect(() => new Product("123", "Product 2", 0)).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product Old Name", 150);

    expect(product.name).toBe("Product Old Name");

    product.changeName("Product New Name");

    expect(product.name).toBe("Product New Name");
  });

  it("should throw an error when change name is empty", () => {
    const product = new Product("123", "Product 1", 150);

    expect(() => product.changeName("")).toThrowError("Name is required");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 150);

    expect(product.price).toBe(150);

    product.changePrice(200);

    expect(product.price).toBe(200);
  });

  it("should throw an error when change price is zero or less than zero", () => {
    const product = new Product("123", "Product 1", 150);

    expect(() => product.changePrice(-5)).toThrowError("Price must be greater than zero");
    expect(() => product.changePrice(0)).toThrowError("Price must be greater than zero");
  });
});
