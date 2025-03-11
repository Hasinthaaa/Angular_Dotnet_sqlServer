

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from './cart.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  add(cartItem: ICart): void {
    const payload = {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      userId: cartItem.userId
    };

    console.log("Adding item to cart:", payload);

    this.http.post('/api/cart/AddToCart', payload, { responseType: 'text' })
      .subscribe(response => {
        console.log('Response:', response);
      });

  }

  getCartItems(userId :number): Observable<ICart[]>{
    return this.http.get<ICart[]>(`api/cart?userId=${userId}`)
  }



  remove(cartItem: ICart): void {
    console.log(`Removing cart item with ID: ${cartItem.cartId} for User ID: ${cartItem.userId}`);

    const deleteItemDetails = {
      cartId: cartItem.cartId,
      userId: cartItem.userId
    };

    this.http.delete('/api/cart/DeleteCartItem', {
      body: deleteItemDetails  // Pass the data in the body
    }).subscribe(() => {
      console.log('Cart item removed');
    });
  }


  update(cartItem: ICart): void {
    const payload = {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      userId: cartItem.userId
    };

    console.log("Updating cart item:", payload);

    this.http.put<ICart>(`/api/cart/${cartItem.productId}`, payload).subscribe(updatedItem => {
      console.log('Cart item updated:', updatedItem);
    });
  }
}
