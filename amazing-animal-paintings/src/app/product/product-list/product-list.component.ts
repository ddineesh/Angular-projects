import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortedOrder: string = '';

  constructor(private productService: ProductService, private cartService: CartService,
     private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  } 

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: (response) => {
        console.log('Product added to cart successfully:', response);
        this.snackBar.open('Product added to cart!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
        this.snackBar.open('Error adding product to cart!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }     
    });
  }
  applyFilter(event: Event): void{
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  sortProducts(criteria: string): void {
    this.sortedOrder = criteria;
    if(this.sortedOrder === "priceLowToHigh"){
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if(this.sortedOrder === "priceHighToLow"){
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if(this.sortedOrder === "nameAToZ") {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if(this.sortedOrder === "nameZToA") {
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

  //   if (criteria === 'priceAsc') {
  //     this.filteredProducts.sort((a, b) => a.price - b.price);
  //   } else if (criteria === 'priceDesc') {
  //     this.filteredProducts.sort((a, b) => b.price - a.price);
  //   } else if (criteria === 'nameAsc') {
  //     this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  //   } else if (criteria === 'nameDesc') {
  //     this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  //   }

   } 
  
}
