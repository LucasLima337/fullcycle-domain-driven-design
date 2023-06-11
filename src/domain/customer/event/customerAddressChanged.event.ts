import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  private _dateTimeOccurred: Date;
  private _eventData: any;

  constructor(eventData: any) {
    this._dateTimeOccurred = new Date();
    this._eventData = eventData;
  }

  get dateTimeOccurred(): Date {
    return this._dateTimeOccurred;
  }

  get eventData(): any {
    return this._eventData;
  }
}
