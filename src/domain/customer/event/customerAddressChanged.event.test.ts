import EventDispatcher from "../../@shared/event/eventDispatcher";
import Customer from "../entity/customer";
import Address from "../valueObject/address";
import CustomerAddressChangedEvent from "./customerAddressChanged.event";
import SendConsoleLogHandler from "./handler/sendConsoleLog.handler";

describe("Customer address changed event test", () => {
  it("should create an address changed event", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Street", "City", 123, "Zip");
    customer.address = address;

    const newAddress = new Address("Street 2", "City 2", 456, "Zip 2");
    customer.changeAddress(newAddress);

    const eventDispatcher = new EventDispatcher();
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({ id: customer.id, name: customer.name, address: customer.address.toString() });
    const eventHandler = new SendConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(customerAddressChangedEvent.constructor.name, eventHandler);

    expect(eventDispatcher.eventHandlers[customerAddressChangedEvent.constructor.name].length).toBe(1);

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
