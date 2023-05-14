import Order from "../../../../domain/order/entity/order";
import OrderItem from "../../../../domain/order/entity/orderItem";
import OrderRepositoryInterface from "../../../../domain/order/repository/order.repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";

export default class OrderRepository implements OrderRepositoryInterface {
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
    }, { include: "items" });
  }

  async update(order: Order): Promise<void> {
    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: "items", rejectOnEmpty: true });
    
    await orderModel.update({ total: order.total });

    orderModel.items.forEach(async item => {
      const orderItem = order.items.find(orderItem => orderItem.id === item.id);

      if (orderItem) {
        item.set({
          quantity: orderItem.quantity,
          total: orderItem.total,
        });

        await item.save();
      }
    });
  }

  async find(id: string): Promise<Order> {
    let orderModel: OrderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
        include: "items",
      });
    } catch {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(orderItemModel => new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.productId, orderItemModel.quantity));
    const order = new Order(orderModel.id, orderModel.customerId, orderItems);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: "items" });

    const orders = orderModels.map(orderModel => {
      const orderItems = orderModel.items.map(orderItemModel => new OrderItem(orderItemModel.id, orderItemModel.name, orderItemModel.price, orderItemModel.productId, orderItemModel.quantity));
      const order = new Order(orderModel.id, orderModel.customerId, orderItems);

      return order;
    });

    return orders;
  }
}
