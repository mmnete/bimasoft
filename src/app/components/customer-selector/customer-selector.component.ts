import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss'],
  imports: [CommonModule, MaterialModule]
})
export class CustomerSelectorComponent {
  // Fake customer data for now
  customers = [
    { id: 1, name: 'John Doe', phoneNumber: '0712345678', email: 'john.doe@example.com', icon: 'account_circle' },
    { id: 2, name: 'Jane Smith', phoneNumber: '0787654321', email: 'jane.smith@example.com', icon: 'account_circle' },
    { id: 3, name: 'Samuel K. Alaba', phoneNumber: '0756782345', email: 'samuel.alaba@example.com', icon: 'account_circle' },
    { id: 4, name: 'Mary Ann', phoneNumber: '0701234567', email: 'mary.ann@example.com', icon: 'account_circle' }
  ];

  @Output() customerSelected = new EventEmitter<any>();

  selectCustomer(customer: any): void {
    this.customerSelected.emit(customer);
  }
}
