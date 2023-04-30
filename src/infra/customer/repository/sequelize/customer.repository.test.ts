import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/valueObject/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "customer 1");
    const address = new Address("street 1", "city 1", 0, "zip code 1");
    customer.address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" }, rejectOnEmpty: true });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "customer 1",
      street: "street 1",
      city: "city 1",
      number: 0,
      zipCode: "zip code 1",
      active: false,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "customer 1");
    const address = new Address("street 1", "city 1", 0, "zipcode 1");
    customer.address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" }, rejectOnEmpty: true });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "customer 1",
      street: "street 1",
      city: "city 1",
      number: 0,
      zipCode: "zipcode 1",
      active: false,
      rewardPoints: 0,
    });

    customer.changeName("customer 2");
    customer.changeAddress(new Address("street 2", "city 2", 2, "zipCode 2"));
    
    await customerRepository.update(customer);

    const updatedCustomerModel = await CustomerModel.findOne({ where: { id: "1" }, rejectOnEmpty: true });

    expect(updatedCustomerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "customer 2",
      street: "street 2",
      city: "city 2",
      number: 2,
      zipCode: "zipCode 2",
      active: false,
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "customer 1");
    const address = new Address("street 1", "city 1", 0, "zip code 1");
    customer.address = address;
    customer.activate();
    customer.addRewardPoints(10);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" }, rejectOnEmpty: true });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "customer 1",
      street: "street 1",
      city: "city 1",
      number: 0,
      zipCode: "zip code 1",
      active: true,
      rewardPoints: 10,
    });

    const foundCustomer = await customerRepository.find("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.address.street,
      city: foundCustomer.address.city,
      number: foundCustomer.address.number,
      zipCode: foundCustomer.address.zipCode,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.rewardPoints,
    });
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => { await customerRepository.find("1UCAS") }).rejects.toThrowError("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "customer 1");
    const customer2 = new Customer("2", "customer 2");
    const address = new Address("street", "city", 0, "zip code");
    customer1.address = address;
    customer2.address = address;

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(customers).toStrictEqual(foundCustomers);
  });
});
