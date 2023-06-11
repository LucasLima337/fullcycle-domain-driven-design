import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default class SendConsoleLog1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: ${event.constructor.name}`);
    console.log(`Id do cliente: ${event.eventData.id} - Nome do cliente: ${event.eventData.name}`);
  }
}
