import { Component, OnInit } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { ICart } from './cart.model';
import { AuthService } from './../auth.service'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], // Add this line
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private cart: ICart[] = [];
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    // const userId =1
    const token = localStorage.getItem('token');
    // console.log('token--------------------', token);

      const userId = this.authService.getUserIdFromToken();
      if (userId){
      this.cartService.getCartItems((Number(userId))).subscribe({
        next: (cart) => (this.cart = cart),
      });

    }

  }

  get cartItems() {
    // return this.cart;
    // console.log(JSON.parse(JSON.stringify(this.cart)))
    return JSON.parse(JSON.stringify(this.cart));
  }

  get cartTotal() {
    return this.cart.reduce((prev, next) => {
      let discount = next.product.discount && next.product.discount > 0 ? 1 - next.product.discount : 1;
      return prev + next.product.price * discount;
    }, 0);
  }

  removeFromCart(cartItem: ICart) {
    this.cartService.remove(cartItem);
  }

  getImageUrl(cartItem: ICart) {
    if (!cartItem.product) return '';
    return '/assets/images/robot-parts/' + cartItem.product.imageName;
  }
}
