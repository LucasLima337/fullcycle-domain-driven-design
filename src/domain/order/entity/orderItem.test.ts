import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new OrderItem("", "Item 1", 20)).toThrowError("Id is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new OrderItem("123", "", 30)).toThrowError("Name is required");
  });

  it("should throw an error when price is zero or less than zero", () => {
    expect(() => new OrderItem("123", "Item 2", -5)).toThrowError("Price must be greater than zero");
    expect(() => new OrderItem("123", "Item 2", 0)).toThrowError("Price must be greater than zero");
  });
});
