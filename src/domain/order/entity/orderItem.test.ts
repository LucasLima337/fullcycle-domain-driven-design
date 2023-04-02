import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new OrderItem("", "Item 1", 20, "123", 2)).toThrowError("Id is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new OrderItem("123", "", 30, "123", 1)).toThrowError("Name is required");
  });

  it("should throw an error when price is zero or less than zero", () => {
    expect(() => new OrderItem("123", "Item 2", -5, "123", 3)).toThrowError("Price must be greater than zero");
    expect(() => new OrderItem("123", "Item 2", 0, "123", 4)).toThrowError("Price must be greater than zero");
  });

  it("should throw an error when productId is empty", () => {
    expect(() => new OrderItem("123", "Item 3", 20, "", 5)).toThrowError("Product Id is required");
  });

  it("should throw an error when quantity is zero or less than zero", () => {
    expect(() => new OrderItem("123", "Item 4", 20, "123", -5)).toThrowError("Quantity must be greater than zero");
    expect(() => new OrderItem("123", "Item 4", 20, "123", 0)).toThrowError("Quantity must be greater than zero");
  });
});
