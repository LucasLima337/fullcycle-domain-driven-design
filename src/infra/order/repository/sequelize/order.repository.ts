import Order from "../../../../domain/order/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";

export default class OrderRepository {
  async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customerId: order.customerId,
      total: order.total,
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        total: item.total,
      })),
    }, { include: [{ model: OrderItemModel }] });
  }
}
