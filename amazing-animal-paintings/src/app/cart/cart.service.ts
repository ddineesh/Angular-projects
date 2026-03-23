import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiCartUrl = environment.apiUrl + '/cart';
  private apiCheckoutUrl = environment.apiUrl + '/checkout';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiCartUrl);
  }

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiCartUrl, product);
  }

  clearCart(productId: number): Observable<any> {
    return this.http.delete(this.apiCartUrl);
  }

  checkout(products: Product[]): Observable<any> {
    return this.http.post(this.apiCheckoutUrl, { products });
  }
}
