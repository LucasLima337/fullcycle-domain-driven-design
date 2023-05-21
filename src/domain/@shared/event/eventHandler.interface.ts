import EventInterface from "./event.interface";

export default interface EventHandlerInterface<Event extends EventInterface=EventInterface> {
  handle(event: Event): void;
}
