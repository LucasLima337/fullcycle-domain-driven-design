import Customer from "../../customer/entity/customer";
import Address from "../../customer/valueObject/address";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total price of all orders", () => {
    const item1 = new OrderItem("id1", "product1", 10, "123", 2);
    const item2 = new OrderItem("id2", "product2", 20, "124", 1);
    const item3 = new OrderItem("id3", "product3", 30, "125", 3);

    const order1 = new Order("id1", "customerId1", [item1, item2]);
    const order2 = new Order("id2", "customerId1", [item3]);

    const totalPriceOrder = OrderService.getPriceAll([order1, order2]);

    expect(totalPriceOrder).toBe(130);
  });

  it("should throw an error when calculate orders without any orders", () => {
    expect(() => OrderService.getPriceAll([])).toThrowError("Orders is required");
  });

  it("should place an order", () => {
    const customer = new Customer("123", "customer1");
    const address = new Address("street1", "city1", 123, "zip1");
    customer.address = address;
    customer.activate();

    const item1 = new OrderItem("id1", "product1", 10, "123", 2);
    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(10);
    expect(order.total).toBe(20);
  });

  it("should not place an order when customer is not active", () => {
    const customer = new Customer("123", "customer1");
    const item1 = new OrderItem("id1", "product1", 10, "123", 2);
    
    expect(() => OrderService.placeOrder(customer, [item1])).toThrowError("Customer is not active");
  });

  it("should not place an order when customer has no items", () => {
    const customer = new Customer("123", "customer1");
    const address = new Address("street1", "city1", 123, "zip1");
    customer.address = address;
    customer.activate();

    expect(() => OrderService.placeOrder(customer, [])).toThrowError("Order must have at least one item");
  });
});
