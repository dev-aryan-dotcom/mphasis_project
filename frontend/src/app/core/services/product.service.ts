import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class ProductService {
    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/products`);
    }
    addProduct(data: any) {
        return this.http.post(`${environment.apiUrl}/products/`, data)
    }
    deleteProduct(id: string) {
        return this.http.delete(`${environment.apiUrl}/products/${id}`)
    }
}