import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/valueObject/address";
import CustomerModel from "./customer.model";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      city: customer.address.city,
      number: customer.address.number,
      zipCode: customer.address.zipCode,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update({
      name: customer.name,
      street: customer.address.street,
      city: customer.address.city,
      number: customer.address.number,
      zipCode: customer.address.zipCode,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    }, { where: { id: customer.id } });
  }

  async find(id: string): Promise<Customer> {
    let customerModel: CustomerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true
      });
    } catch {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.city,
      customerModel.number,
      customerModel.zipCode,
    );
    
    customer.address = address;
    customer.addRewardPoints(customerModel.rewardPoints);
    
    if (customerModel.active) { customer.activate(); }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.number,
        customerModel.zipCode,
      );
      customer.address = address;
      customer.addRewardPoints(customerModel.rewardPoints);

      if (customerModel.active) { customer.activate(); }

      return customer;
    });

    return customers;
  }
}
