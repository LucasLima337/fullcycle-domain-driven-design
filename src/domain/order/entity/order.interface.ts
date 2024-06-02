import type OrderItem from "./orderItem";

export default interface OrderInterface {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  updateOrderItem(itemId: string, quantity: number): void;
}
