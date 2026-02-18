import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private http: HttpClient) {}

  add(productId: string) {
    return this.http.post(`${environment.apiUrl}/cart/add`, { productId });
  }

  getCart() {
    return this.http.get(`${environment.apiUrl}/cart`);
  }

  remove(productId: string) {
    return this.http.delete(`${environment.apiUrl}/cart/${productId}`);
  }
}
