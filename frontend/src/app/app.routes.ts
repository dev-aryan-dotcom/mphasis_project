import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'login'},
    {path:'login', loadComponent:()=>import('./auth/login/login').then(m=>m.Login)},
    {path:'register', loadComponent:()=>import('./auth/register/register').then(m=>m.Register)},
    {path:'', loadComponent:()=>import('./shop/product-list/product-list').then(m=>m.ProductList)},
    {path:'admin', canActivate:[authGuard, adminGuard], loadComponent:()=>import('./admin/admin-dashboard.component').then(m=>m.AdminDashboardComponent)},
    {path:'cart', loadComponent:()=>import('./shop/cart/cart').then(m=>m.Cart)},
    {path:'profile', canActivate:[authGuard], loadComponent:()=>import('./user/profile/profile').then(m=>m.Profile)},
];
