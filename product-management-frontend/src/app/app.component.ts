import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { SweetalertService } from './services/sweetalert.service';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `<router-outlet></router-outlet>`, 
})
export class AppComponent {
  title = 'product-management-frontend';
  loading$: Observable<boolean>;

  constructor(private sweetalertService: SweetalertService, private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

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
