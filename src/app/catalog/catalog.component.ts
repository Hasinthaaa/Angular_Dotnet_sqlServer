import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ICart } from '../cart/cart.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  products: any;
  filter: string = ' ';


  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    });
    // this.filter = this.route.snapshot.params['filter'];
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter'];
    })
  }

  addToCart(cartItem: ICart) {
    cartItem.userId = 1;
    cartItem.quantity = 1;
    this.cartSvc.add(cartItem);
    this.router.navigate(['/cart']);

  }

  getFilteredProducts() {
    return !this.filter || this.filter.trim() === ''
      ? this.products
      : this.products.filter((product: any) => product && product.category === this.filter);
  }



}
