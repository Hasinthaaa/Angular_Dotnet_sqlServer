import { IProduct } from "../catalog/product.model";

export interface ICart {
  cartId: number;
  productId: number;
  product: IProduct ;  // Assuming IProduct model exists in your frontend
  quantity: number;
  userId: number;
  dateAdded: string;  // Use a string to represent the Date (ISO format)
}
