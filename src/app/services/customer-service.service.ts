import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers = [
    { id: 1, name: 'John Doe', phoneNumber: '123-456-7890', email: 'john@example.com', icon: 'person' },
    { id: 2, name: 'Jane Smith', phoneNumber: '987-654-3210', email: 'jane@example.com', icon: 'person' },
    { id: 3, name: 'Alice Johnson', phoneNumber: '555-666-7777', email: 'alice@example.com', icon: 'person' }
  ];

  getCustomers(): Observable<any[]> {
    return of(this.customers).pipe(delay(500)); // Simulate async delay
  }
}
