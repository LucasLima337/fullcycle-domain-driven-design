import Order from "../entity/order";
import OrderInterface from "../entity/order.interface";
import OrderItem from "../entity/orderItem";

interface OrderPropsItemInterface {
  id: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
}

interface OrderPropsInterface {
  id: string;
  customerId: string;
  items: OrderPropsItemInterface[];
}

export default class OrderFactory {
  static create(orderProps: OrderPropsInterface): OrderInterface {
    const items = orderProps.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity));
    const order = new Order(orderProps.id, orderProps.customerId, items);

    return order;
  }
}
