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
});
