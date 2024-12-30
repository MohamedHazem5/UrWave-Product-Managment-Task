import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';


export const routes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/create', component: CreateProductComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
];
