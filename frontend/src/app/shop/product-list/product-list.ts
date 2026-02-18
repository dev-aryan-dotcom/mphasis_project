import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../core/services/product.service';
@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, MatButtonModule, NgFor],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: any = [];

  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.ps.getProducts().subscribe(res => this.products = res);
  }
}
