import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static getPriceAll(orders: Order[]): number {
    if (orders.length === 0) {
      throw new Error("Orders is required");
    }

    return orders.reduce((total, order) => total + order.total, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!customer.isActive()) {
      throw new Error("Customer is not active");
    }

    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total / 2);

    return order;
  }
}
