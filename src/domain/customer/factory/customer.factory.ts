import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import Address from "../valueObject/address";
import { v4 as uuid } from "uuid";

export default class CustomerFactory {
  static create(name: string, address?: Address): CustomerInterface {
    const customer = new Customer(uuid(), name);

    if (address) {
      customer.address = address;
    }

    return customer;
  }
}
