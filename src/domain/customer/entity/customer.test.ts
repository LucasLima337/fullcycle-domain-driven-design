import Customer from "./customer";
import Address from "../valueObject/address";

describe("Customer unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrowError("Id is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new Customer("1", "")).toThrowError("Name is required");
  });

  it("should throw an error when changing name to empty", () => {
    const customer = new Customer("1", "John Doe");

    expect(() => customer.changeName("")).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe");
    customer.changeName("Jake");

    expect(customer.name).toBe("Jake");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street", "City", 123, "Zip");
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw an error when activating customer without address", () => {
    const customer = new Customer("1", "John Doe");

    expect(() => customer.activate()).toThrowError("Address is required to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street", "City", 123, "Zip");
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.rewardPoints).toBe(0);
  
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });

  it("should not add negative reward points", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    expect(() => customer.addRewardPoints(-10)).toThrowError("Points cannot be negative");
  });
});
