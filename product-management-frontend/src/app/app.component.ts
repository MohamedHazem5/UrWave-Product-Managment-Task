import { Component } from '@angular/core';
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent,FontAwesomeModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<router-outlet></router-outlet>`,  // Where routed content will be injected

})
export class AppComponent {
  title = 'product-management-frontend';
}
