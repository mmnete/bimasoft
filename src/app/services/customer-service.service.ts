import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers = [
    { id: 1, type: "individual", name: 'John Doe', phoneNumber: '123-456-7890', email: 'john@example.com', icon: 'person' },
    { id: 2, type: "individual", name: 'Jane Smith', phoneNumber: '987-654-3210', email: 'jane@example.com', icon: 'person' },
    { id: 3, type: "individual", name: 'Alice Johnson', phoneNumber: '555-666-7777', email: 'alice@example.com', icon: 'person' },
    { id: 4, type: "business", name: 'Tech Corp', phoneNumber: '333-444-5555', email: 'tech@corp.com', icon: 'business' },
    { id: 5, type: "business", name: 'Design Studio', phoneNumber: '666-777-8888', email: 'design@studio.com', icon: 'business' }
  ];

  getCustomers(nameFilter: string = '', typeFilter: string = ''): Observable<any[]> {
    let filteredCustomers = this.customers;

    // Apply name filter if provided
    if (nameFilter.trim()) {
      filteredCustomers = filteredCustomers.filter(customer => 
        customer.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Apply type filter if provided
    if (typeFilter) {
      filteredCustomers = filteredCustomers.filter(customer => 
        customer.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    return of(filteredCustomers).pipe(delay(500)); // Simulate async delay
  }
}
