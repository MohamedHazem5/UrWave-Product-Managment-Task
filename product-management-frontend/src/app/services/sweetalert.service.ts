import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root', // Makes the service available globally
})
export class SweetalertService {
  // General alert
  showAlert(options: SweetAlertOptions) {
    return Swal.fire(options);
  }

  // Success alert
  showSuccess(message: string, title: string = 'Success') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  // Error alert
  showError(message: string, title: string = 'Error') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  // Confirmation dialog
  confirmAction(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
  }
}
