import { Component } from '@angular/core';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent,FontAwesomeModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<router-outlet></router-outlet>`,  // Where routed content will be injected

})
export class AppComponent {
  title = 'product-management-frontend';
}
