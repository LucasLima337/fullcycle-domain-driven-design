import EventHandlerInterface from "../../../@shared/event/eventHandler.interface";
import ProductCreatedEvent from "../productCreated.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Event occured at ${event.dateTimeOccurred}`);
    console.log("Sending email to ...");
  }
}
