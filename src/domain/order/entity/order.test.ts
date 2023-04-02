import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Order("", "1", [])).toThrowError("Id is required");
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError("Customer Id is required");
  });

  it("should throw an error when items is empty", () => {
    expect(() => new Order("1", "1", [])).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const items = [
      new OrderItem("1", "Item 1", 10, "1", 1),
      new OrderItem("2", "Item 2", 20, "2", 2),
      new OrderItem("3", "Item 3", 30, "3", 1),
    ];

    const order = new Order("1", "1", items);

    expect(order.total).toBe(80);
  });
});
