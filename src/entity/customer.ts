class Customer {
  private _id: string;
  private _name: string;
  private _address!: string;
  private _active = false;

  constructor (id: string, name: string) {
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

  get address(): string {
    return this._address;
  }

  changeAddress(address: string): void {
    this._address = address;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
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

  validate(): void {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }
}
