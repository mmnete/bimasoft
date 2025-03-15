import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer-service.service';

@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss'],
  imports: [CommonModule, MaterialModule]
})
export class CustomerSelectorComponent {
  searchTerm: string = '';
  customers: any[] = [];
  filteredCustomers: any[] = [];
  selectedCustomer: any = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
      this.customerService.getCustomers().subscribe(customers => {
          this.customers = customers;
          this.filteredCustomers = customers;
      });
  }

  filterCustomers() {
      this.filteredCustomers = this.customers.filter(customer => 
          customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          customer.phoneNumber.includes(this.searchTerm)
      );
  }

  selectCustomer(customer: any) {
      this.selectedCustomer = customer;
  }
}
