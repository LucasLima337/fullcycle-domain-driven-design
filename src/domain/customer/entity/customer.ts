import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error("Address is required to activate a customer");
    }

    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  private validate(): void {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }
}
