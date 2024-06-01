import Address from "../valueObject/address";

export default interface CustomerInterface {
  id: string;
  name: string;
  rewardPoints: number;
  address: Address;
  changeAddress(address: Address): void;
  changeName(name: string): void;
  isActive(): boolean;
  activate(): void;
  deactivate(): void;
  addRewardPoints(points: number): void;
}
