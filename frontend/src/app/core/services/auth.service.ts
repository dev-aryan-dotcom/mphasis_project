import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(private http: HttpClient, private router: Router) { }

    register(data: any) {
        return this.http.post(`${environment.apiUrl}/auth/register`, data);
    }

    login(data: any) {
        return this.http.post(`${environment.apiUrl}/auth/login`, data);
    }


    saveToken(token: string) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token')
    }

    getRole() {
        const token: any = this.getToken();
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.role;
    }

    logout() {
        localStorage.clear()
        this.router.navigate(['/login'])
    }

    isLoggedIn() {
        return !!this.getToken()
    }
}