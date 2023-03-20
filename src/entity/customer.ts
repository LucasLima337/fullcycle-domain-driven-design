class Customer {
  private _id: string;
  private _name: string;
  private _address: string;
  private _active = false;

  constructor (id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
  
  changeName(name: string): void {
    this._name = name;
  }

  get address(): string {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  activate(): void {
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }
}
