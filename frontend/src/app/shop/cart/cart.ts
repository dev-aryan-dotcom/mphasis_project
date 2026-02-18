import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-cart',
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cart: any[] = [];
  total = 0;

  constructor(private cartService: CartService,
    private http: HttpClient) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart()
      .subscribe((res: any) => {
        this.cart = res.items;
        this.total = res.total;
      });
  }

  remove(id: string) {
    this.cartService.remove(id)
      .subscribe(() => this.loadCart());
  }

  checkout() {
    this.http.post(`${environment.apiUrl}/payment/checkout`, {
      amount: this.total
    })
      .subscribe((res: any) => {
        window.location.href = `https://checkout.stripe.com/pay/${res.id}`;
      });
  }
}
