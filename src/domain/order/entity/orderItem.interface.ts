export default interface OrderItemInterface {
  id: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  total: number;
  updateQuantity(quantity: number): void;
}
