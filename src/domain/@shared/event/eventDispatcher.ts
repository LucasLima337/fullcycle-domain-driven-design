import EventInterface from "./event.interface";
import EventDispatcherInterface from "./eventDispatcher.interface";
import EventHandlerInterface from "./eventHandler.interface";

interface EventHandlers { [eventName: string]: EventHandlerInterface[] }

export default class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: EventHandlers = {};
  
  get eventHandlers(): EventHandlers {
    return this._eventHandlers;
  }
  
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;

    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName].forEach(eventHandler => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push(eventHandler);
  }
  
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this._eventHandlers[eventName]) {
      const index = this._eventHandlers[eventName].indexOf(eventHandler);

      if (index !== -1) {
        this._eventHandlers[eventName].splice(index, 1);
      }
    }
  }
  
  unregisterAll(): void {
    this._eventHandlers = {};
  }
}
