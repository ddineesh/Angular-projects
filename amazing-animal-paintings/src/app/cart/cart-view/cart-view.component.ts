import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  

  constructor(private cartService: CartService) {
    
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart(1).subscribe();
  }
  checkout() {
    this.cartService.checkout(this.cartItems).subscribe();
  }
}
