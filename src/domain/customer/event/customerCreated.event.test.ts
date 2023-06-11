import EventDispatcher from "../../@shared/event/eventDispatcher";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customerCreated.event";
import SendConsoleLog1Handler from "./handler/sendConsoleLog1.handler";
import SendConsoleLog2Handler from "./handler/sendConsoleLog2.handler";

describe("Customer created event test", () => {
  it("should create a customer created event", () => {
    const customer = new Customer("1", "John Doe");

    const eventDispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent({ id: customer.id, name: customer.name });
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register(customerCreatedEvent.constructor.name, eventHandler1);
    eventDispatcher.register(customerCreatedEvent.constructor.name, eventHandler2);

    expect(eventDispatcher.eventHandlers[customerCreatedEvent.constructor.name].length).toBe(2);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
