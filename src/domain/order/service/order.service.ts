import type Order from "../entity/order";

export default class OrderService {
  static getPriceAll(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total, 0);
  }
}
