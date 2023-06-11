import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreated.handler";
import ProductCreatedEvent from "../../product/event/productCreated.event";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);
    
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.eventHandlers).toMatchObject({});
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const productCreatedEvent = new ProductCreatedEvent({ name: "Product 1", price: 100 });
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register(productCreatedEvent.constructor.name, eventHandler);

    expect(eventDispatcher.eventHandlers["ProductCreatedEvent"].length).toBe(1);

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
