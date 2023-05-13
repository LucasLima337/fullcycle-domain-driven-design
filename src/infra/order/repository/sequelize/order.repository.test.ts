import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/valueObject/address";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/order/entity/orderItem";
import Order from "../../../../domain/order/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    
    sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "customer 1");
    const address = new Address("street 1", "city 1", 0, "zip code 1");
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "product 1", 150);
    const product2 = new Product("2", "product 2", 300);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItems = [
      new OrderItem("1", product1.name, product1.price, product1.id, 1),
      new OrderItem("2", product2.name, product2.price, product2.id, 2),
    ];

    const order = new Order("1", customer.id, orderItems);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: "items", rejectOnEmpty: true });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total,
      items: [
        {
          id: orderItems[0].id,
          name: orderItems[0].name,
          price: orderItems[0].price,
          productId: orderItems[0].productId,
          orderId: order.id,
          quantity: orderItems[0].quantity,
          total: orderItems[0].total,
        },
        {
          id: orderItems[1].id,
          name: orderItems[1].name,
          price: orderItems[1].price,
          productId: orderItems[1].productId,
          orderId: order.id,
          quantity: orderItems[1].quantity,
          total: orderItems[1].total,
        },
      ],
    });
  });
});
