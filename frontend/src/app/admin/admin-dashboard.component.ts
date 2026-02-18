import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { ProductService } from "../core/services/product.service";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']   // ✅ fixed
})
export class AdminDashboardComponent implements OnInit {

  products: any[] = [];

  name = '';
  price = 0;
  description = '';
  image = '';

  constructor(private ps: ProductService) {}

  ngOnInit() {
    // this.load();   // ✅ load once on start
  }

  load() {
    this.ps.getProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: () => {
        alert('Error loading products');
      }
    });
  }

  resetForm() {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.image = '';
  }

  add() {

    if (
      !this.name.trim() ||
      !this.description.trim() ||
      !this.image.trim() ||
      this.price <= 0
    ) {
      alert('Please fill all fields correctly!');
      return;
    }

    this.ps.addProduct({
      name: this.name.trim(),
      price: Number(this.price),
      description: this.description.trim(),
      image: this.image.trim()
    }).subscribe({
      next: () => {
          // this.load();   // ✅ reload immediately
          alert('Product added successfully!');
          this.resetForm();
      },
      error: () => {
        alert('Something went wrong while adding product.');
      }
    });
  }

  delete(id: string) {
    this.ps.deleteProduct(id).subscribe({
      next: () => {
        this.load();
      },
      error: () => {
        alert('Error deleting product');
      }
    });
  }
}
