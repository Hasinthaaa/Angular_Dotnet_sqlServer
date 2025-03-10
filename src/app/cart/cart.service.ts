// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ICart } from './cart.model';  // Assuming the ICart model is in the same directory
// import { IProduct } from '../catalog/product.model';  // Assuming IProduct is in another directory

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cart: ICart[] = [];
//   cartItem: any;

//   constructor(private http: HttpClient) { }

//   add(cartItem: ICart) {

//     // ✅ Correctly defining the payload object
//     const payload = { 
//       productId: cartItem.productId, 
//       quantity: cartItem.quantity, 
//       userId: cartItem.userId 
//     };

//     // Uncomment this line when you're ready to make an HTTP request
//     this.http.post<ICart>(`/api/cart/AddToCart`, payload).subscribe(response => {
//       console.log('Cart item added:', response);
//     });
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from './cart.model';

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

    // this.http.post<ICart>('/api/cart/AddToCart', payload).subscribe(response => {
    //   console.log('Cart item added:', response);
    // });

    this.http.post('/api/cart/AddToCart', payload, { responseType: 'text' })
      .subscribe(response => {
        console.log('Response:', response);
      });

  }

  getCartItems(): void {
    console.log("Fetching cart items...");
    this.http.get<ICart[]>('/api/cart').subscribe(items => {
      console.log('Cart items:', items);
    });
  }

  remove(cartItemId: number): void {
    console.log(`Removing cart item with ID: ${cartItemId}`);
    this.http.delete<void>(`/api/cart/${cartItemId}`).subscribe(() => {
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
