export default class Address {
  private _street: string;
  private _city: string;
  private _number: number;
  private _zipCode: string;

  constructor(street: string, city: string, number: number, zipCode: string) {
    this._street = street;
    this._city = city;
    this._number = number;
    this._zipCode = zipCode;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get number(): number {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  private validate(): void {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }

    if (this._city.length === 0) {
      throw new Error("City is required");
    }

    if (this._number === undefined) {
      throw new Error("Number is required");
    }

    if (this._zipCode.length === 0) {
      throw new Error("Zip code is required");
    }
  }

  toString(): string {
    return `${this._street}, ${this._number} - ${this._city} - ${this._zipCode}`;
  }
}
