import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';


export const routes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: 'products/create', component: CreateProductComponent },
    { path: 'products/edit/:id', component: EditProductComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },


];
