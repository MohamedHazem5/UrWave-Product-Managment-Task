import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { SweetalertService } from './services/sweetalert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<router-outlet></router-outlet>`, // Where routed content will be injected
})
export class AppComponent {
  title = 'product-management-frontend';

  constructor(private sweetalertService: SweetalertService) {}

  showSuccess() {
    this.sweetalertService.showSuccess('Operation was successful!');
  }

  showError() {
    this.sweetalertService.showError('Something went wrong.');
  }

  confirmAction() {
    this.sweetalertService
      .confirmAction('Do you really want to proceed?')
      .then((result) => {
        if (result.isConfirmed) {
          this.sweetalertService.showSuccess('Action confirmed!');
        } else {
          this.sweetalertService.showError('Action canceled.');
        }
      });
  }
}
