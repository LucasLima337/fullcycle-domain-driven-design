import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);
  }
}
